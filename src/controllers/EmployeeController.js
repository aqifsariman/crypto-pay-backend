import bcrypt from "bcryptjs";

export default function initEmployeeController(db) {
  const addEmployee = async (req, res) => {
    try {
      let { name, email, designation, salary, walletAddress, isHR } = req.body;
      const user = await db.User.create({
        name,
        email,
        password: bcrypt.hashSync("password", 8),
        designation,
        salary: Number(salary),
        walletAddress,
        isHR: isHR,
        isVerified: false,
        companyId: 1,
      });

      if (user) {
        return res
          .status(200)
          .send({ user, message: "User was added successfully!" });
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
    addEmployee,
  };
}
