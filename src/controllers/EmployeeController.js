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

  const getEmployee = async (req, res) => {
    try {
      let { userId } = req.params;
      const user = await db.User.findByPk(userId);

      if (user) {
        return res.status(200).send({ user, message: "User is found!" });
      } else {
        return res
          .status(404)
          .send({ user: null, message: "User is not found" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const postEmployee = async (req, res) => {
    try {
      let { name, email, designation, salary, walletAddress, isHR } = req.body;
      let { userId } = req.params;

      const user = await db.User.update(
        {
          name,
          email,
          designation,
          salary: Number(salary),
          walletAddress,
          isHR: isHR,
        },
        { where: { id: userId } }
      );

      if (user) {
        return res
          .status(200)
          .send({ user, message: "User was updated successfully!" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const deleteEmployee = async (req, res) => {
    try {
      let { userId } = req.params;

      const deleted = await db.User.destroy({
        where: { id: userId },
      });

      if (!deleted) {
        res.status(204).json({ message: "Collection not found" });
      }
      res.status(202).json({ message: "Deleted!" });
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
    getEmployee,
    postEmployee,
    deleteEmployee,
  };
}
