import express from "express";
import UserService from "../services/UserService.js";
import { createHash } from "crypto";

const router = express.Router();

router.post("/sign_up", async function (req, res, next) {
  let body = req.body;

  const newUser = {
    uid: body.uid,
    pw: body.pw,
    gid: body.gid,
    name: body.name,
    goon_type: body.goon_type,
    is_soldier: is_soldier,
    email: body.email,
    tel: body.tel,
  };

  UserService.addUser(newUser);

  //res.redirect("/user/sign_up");
});

router.get("/", function (req, res, next) {
  let session = req.session;

  /*res.render("user/login", {
        session : session
    });*/
});

// 로그인 POST
router.post("/", async function (req, res, next) {
  let body = req.body;

  //넘겨받은 id로 사용자를 찾는 함수
  let result = UserService.getUserByUid(req.body.uid);

  let dbPassword = result.pw;
  let inputPassword = body.pw;
  let salt = result.salt;
  let hashPassword = createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  if (dbPassword === hashPassword) {
    console.log("비밀번호 일치");
    // 세션 설정
    req.session.uid = body.uid;
  } else {
    console.log("비밀번호 불일치");
  }
  //res.redirect("/user/login");
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("sid");

  //res.redirect("/user/login")
});

export default router;
