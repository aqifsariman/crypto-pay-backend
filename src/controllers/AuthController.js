import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWTSecretKey = process.env.JWT_SECRET_KEY;

/* eslint-disable quotes */
export default function initAuthController(db) {
  const login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, JWTSecretKey, {
        expiresIn: 86400, // 24 hours
      });

      res.cookie("userId", user.id);
      res.cookie("x-access-token", token);

      user.password = null;

      res.status(200).send({
        user,
        message: "Successfully logged in",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const reAuth = async (req, res) => {
    try {
      let token = req.cookies["x-access-token"];
      if (!token) {
        return res.status(403).send({
          message: "No token provided!",
        });
      }
      jwt.verify(token, JWTSecretKey, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        }
        req.userId = decoded.id;
        return res.status(200).send({
          message: "Authorized!",
        });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  const logout = async (req, res) => {
    try {
      res.clearCookie("x-access-token");
      res.clearCookie("userId");
      res.status(200).send({
        message: "Logged out!",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message:
          "Could not perform operation at this time, kindly try again later.",
      });
    }
  };

  return {
    login,
    reAuth,
    logout,
  };
}
