import express from "express";
import UserService from "../services/UserService.js";

const router = express.Router();

router.post("/sign_up", async function (req, res, next) {
  let body = req.body;

  console.log(body);

  const newUser = {
    user_id: body.userId,
    pw: body.pw,
  };
  try {
    UserService.addUser(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }

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
  try {
    await UserService.login(req);
  } catch (err) {
    console.error(err);
    next(err);
  }

  res.redirect("/");
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("sessionId");

  res.redirect("/");
});

export default router;
