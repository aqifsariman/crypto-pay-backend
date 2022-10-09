import dateRangeConverter from "../utils/dateConvert";

export default function initTimesheetController(db) {
  const getTimesheet = async (req, res) => {
    try {
      let { dateRange } = req.query;

      const { month, year } = await dateRangeConverter(dateRange);

      const timesheet = await db.Timesheet.findOrCreate({
        where: { month: month, year: year },
        defaults: {
          isClosed: false,
        },
      });

      const users = await db.User.findAll({
        attributes: { exclude: ["password"] },
        include: {
          model: db.UserTimesheet,
          include: {
            model: db.Timesheet,
            where: { month: month, year: year },
          },
        },
      });

      if (timesheet) {
        return res
          .status(200)
          .send({ users, timesheet: timesheet[0], message: "ok" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const updateTimesheet = async (req, res) => {
    let { timesheet_items } = req.body;

    timesheet_items = JSON.parse(timesheet_items);

    /*let timesheet_items = [
      {
        id: 1,
        timeSheetId: 1,
        userId: 1,
        workingHours: 4,
        totalPay: 0,
        tokensPaid: 0,
        createdAt: "2022-10-08T07:35:58.657Z",
        updatedAt: "2022-10-08T07:35:58.657Z",
      },
      {
        id: 2,
        timeSheetId: 1,
        userId: 2,
        workingHours: 3,
        totalPay: 0,
        tokensPaid: 0,
        createdAt: "2022-10-08T07:35:58.657Z",
        updatedAt: "2022-10-08T07:35:58.657Z",
      },
    ];
    */

    try {
      const replaceTotalPay = async () => {
        await Promise.all(
          timesheet_items.map(async (obj, index) => {
            const user = await db.User.findByPk(obj.userId);
            timesheet_items[index].totalPay = obj.workingHours * user.salary;
            timesheet_items[index].updatedAt = new Date();
          })
        ).then((_response) => {
          console.log("Total Pay recalculate");
        });
      };
      await replaceTotalPay();

      const updatedTimesheets = await db.UserTimesheet.bulkCreate(
        timesheet_items,
        {
          updateOnDuplicate: [
            "timeSheetId",
            "userId",
            "workingHours",
            "totalPay",
            "updatedAt",
          ],
        }
      );
      res.status(200).json({ message: "Success!", updatedTimesheets });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const lockTimesheet = async (req, res) => {
    try {
      let { dateRange } = req.query;

      const { month, year } = await dateRangeConverter(dateRange);

      const lockedTimesheet = await db.Timesheet.findOne({
        where: { month: month, year: year },
      });

      await lockedTimesheet.update({ isClosed: true });
      await lockedTimesheet.save();

      res.status(200).json({ message: "Success!", lockedTimesheet });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  return {
    getTimesheet,
    updateTimesheet,
    lockTimesheet,
  };
}
