import { getConnection } from "./db/database.js";
import { createHash } from "crypto";
import { nextTick } from "process";

const UserService = {
  getUserById: async (userId) => {
    let result = await getConnection(
      "SELECT * FROM users WHERE user_id = ?",
      userId
    );

    return result[0][0];
  },

  addUser: async (user) => {
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashPassword = createHash("sha512")
      .update(user.pw + salt)
      .digest("hex");
    user.pw = hashPassword;
    user.salt = salt;

    console.log(user);

    await getConnection("INSERT INTO users set ?", user);
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
};

export default UserService;
