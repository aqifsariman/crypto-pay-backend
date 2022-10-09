import jwt from "jsonwebtoken";
const JWTSecretKey = process.env.JWT_SECRET_KEY;

export default {
  async verifyToken(req, res, next) {
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
        next();
      });
    } catch (e) {
      console.log(e);
    }
  },
};
