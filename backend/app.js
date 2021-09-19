import express from "express";

import MainRouter from "./routes/main.js";
import LoginRouter from "./routes/LoginRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import session from "express-session";
import logger from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const app = express();
const port = 3000;

//es6 type:module은 __dirname이 없음.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.use(
  session({
    key: "sessionId",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
    },
  })
);

app.use(express.static("public"));
app.use(logger("dev"));

//옛날엔 body-parser 모듈 썼는데 이젠 express 내장 객체되어서 req.body 내용 파싱할 때 이렇게 설정하면 됌.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", MainRouter);
app.use("/login", LoginRouter);
app.use("/api", ApiRouter);

//404 not found 처리
app.get((req, res) => {
  res.status(404).send("not found");
});

//이외의 에러 처리
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(port, function () {
  console.log("Express server has started on port 3000(http://localhost:3000)");
});
