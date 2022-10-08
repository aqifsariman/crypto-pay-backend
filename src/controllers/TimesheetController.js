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

  return {
    getTimesheet,
  };
}
