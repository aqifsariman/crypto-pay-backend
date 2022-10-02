import sequelizePackage from 'sequelize';
import jsSHA from 'jssha';

const { ValidationError, DatabaseError } = sequelizePackage;

/* eslint-disable quotes */
export default function initUserController(db) {
  const login = async (req, res) => {
    try {
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.password);
      const hashedPassword = shaObj.getHash('HEX');
      const user = await db.User.findOne({
        where: {
          username: req.body.username,
        },
      });
      console.log(user);
      if (user === null) {
        res.send('INVALID');
      } else if (hashedPassword === user.dataValues.password) {
        res.send({ valid: true, id: user.dataValues.id });
      } else {
        res.send('INVALID');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error('This is a validation error!');
        console.error(error);
        console.error('The following is the first error message:');
        console.error(error.errors[0].message);
        res.send(error);
      } else if (error instanceof DatabaseError) {
        console.error('This is a database error!');
        console.error(error);
        res.send(error);
      } else {
        console.error(error);
        res.send(error);
      }
    }
  };

  const logout = async (req, res) => {
    localStorage.clear();
  };

  return {
    createUser,
    login,
    logout,
  };
}
