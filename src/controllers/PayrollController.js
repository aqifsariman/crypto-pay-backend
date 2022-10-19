import { Op } from "sequelize";

export default function initPayrollController(db) {
  const getOutstandingPayment = async (req, res) => {
    try {
      const timesheet_items = await db.UserTimesheet.findAll({
        where: {
          totalPay: {
            [Op.gt]: db.sequelize.col("tokensPaid"),
          },
        },
        include: [
          {
            model: db.User,
            attributes: {
              exclude: ["password", "id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Timesheet,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      return res.status(200).json({ timesheet_items });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const payOutstanding = async (req, res) => {
    let { timesheet_items } = req.body;
    timesheet_items = JSON.parse(timesheet_items);
    let transaction_logs = [];
    try {
      const replaceTokensPaid = async () => {
        await Promise.all(
          timesheet_items.map(async (obj, index) => {
            transaction_logs[index] = {};
            transaction_logs[index].userTimesheet = timesheet_items[index].id;

            transaction_logs[index].totalPayment =
              timesheet_items[index].totalPay -
              timesheet_items[index].tokensPaid;

            timesheet_items[index].tokensPaid = timesheet_items[index].totalPay;

            timesheet_items[index].updatedAt = new Date();
          })
        ).then((_response) => {
          console.log("Tokens paid reconciled");
        });
      };
      await replaceTokensPaid();

      const updatedTimesheets = await db.UserTimesheet.bulkCreate(
        timesheet_items,
        {
          updateOnDuplicate: ["tokensPaid", "updatedAt"],
        }
      );

      const transactionLog = await db.TransactionLog.bulkCreate(
        transaction_logs
      );

      res
        .status(200)
        .json({ message: "Success!", updatedTimesheets, transactionLog });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  return {
    getOutstandingPayment,
    payOutstanding,
  };
}
