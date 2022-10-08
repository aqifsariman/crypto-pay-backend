import { Op } from "sequelize";

export default function initPayrollController(db) {
  const getOutstandingPayment = async (req, res) => {
    try {
      const payroll = await db.UserTimesheet.findAll({
        where: {
          totalPay: {
            [Op.gt]: db.sequelize.col("tokensPaid"),
          },
        },
        include: {
          model: db.User,
        },
      });

      return res.status(200).json({ payroll });
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
  };
}
