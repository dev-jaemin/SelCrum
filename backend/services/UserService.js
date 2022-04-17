import { getConnection } from "./db/database.js";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserService = {
  getUserById: async (userId) => {
    const result = await getConnection("SELECT * FROM users WHERE user_id = ?", userId);

    return result[0][0];
  },

  checkPassword: async (userId, pw) => {
    const user = await UserService.getUserById(userId);

    return bcrypt.compareSync(pw, user.pw);
  },

  addUser: async (user) => {
    const encryptedPassword = bcrypt.hashSync(user.pw, 12);
    user.pw = encryptedPassword;

    return await getConnection("INSERT INTO users set ?", user);
  },

  create: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) return res.status(400).end();
      req.login(user, { session: false }, (error) => {
        if (error) next(error);
        const token = jwt.sign(
          {
            user_id: user.user_id,
          },
          process.env.JWT_KEY,
          { expiresIn: "60m" }
        );

        //cors
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        res.cookie("token", token, { httpOnly: true });

        return res.send({ token });
      });
    })(req, res);
  },

  updateUser: async (user) => {
    if (UserService.checkPassword(user.userId, user.currentPw)) {
      const encryptedPassword = bcrypt.hashSync(user.newPw, 12);
      user.newPw = encryptedPassword;

      return await getConnection("UPDATE users SET pw=? WHERE user_id=?", [user.newPw, user.userId]);
    } else {
      return -1;
    }
  },

  deleteUser: async (user) => {
    if (UserService.checkPassword(user.userId, user.pw)) {
      await getConnection("DELETE FROM user_project WHERE user_id=?", user.userId);
      await getConnection("DELETE FROM users WHERE user_id=?", user.userId);

      return 1;
    } else {
      return -1;
    }
  },
};

export default UserService;
