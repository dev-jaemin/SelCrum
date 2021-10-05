import { getConnection } from "./db/database.js";
import { createHash } from "crypto";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const UserService = {
  getUserById: async (userId) => {
    let result = await getConnection(
      "SELECT * FROM users WHERE user_id = ?",
      userId
    );

    return result[0][0];
  },

  addUser: async (user) => {
    /*
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashPassword = createHash("sha512")
      .update(user.pw + salt)
      .digest("hex");
    user.pw = hashPassword;
    user.salt = salt;

    console.log(user);*/

    const encryptedPassword = bcrypt.hashSync(user.pw, 12);
    user.pw = encryptedPassword;

    return await getConnection("INSERT INTO users set ?", user);
  },

  login: async (req) => {
    let body = req.body;

    let result = await UserService.getUserById(body.userId);

    let dbPassword = result.pw;
    let inputPassword = body.pw;
    let salt = result.salt;
    let hashPassword = createHash("sha512")
      .update(inputPassword + salt)
      .digest("hex");

    if (dbPassword === hashPassword) {
      console.log(body.userId + " 비밀번호 일치");
      // 세션 설정
      req.session.userId = body.userId;
    } else {
      console.log(body.userId + "비밀번호 불일치");
    }
    //res.redirect("/user/login");
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
          "global.config.secret",
          { expiresIn: "60m" }
        );

        //cors
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Access-Control-Allow-Credentials", true);
        res.cookie("token", token, { httpOnly: true });

        return res.send({ token });
      });
    })(req, res);
  },
};

export default UserService;
