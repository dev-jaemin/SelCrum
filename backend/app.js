import express from "express";

import LoginRouter from "./routes/LoginRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import logger from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

//for login
import passport from "passport";
import passportConfig from "./passport/index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;

//es6 type:module은 __dirname이 없음.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

/*
app.use(
  session({
    key: "sessionId",
    secret: "global.config.secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
    },
  })
);*/

app.use(express.static("public"));

//combined모드가 좀 더 많은 로그 남김
if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
  //for security
  app.use(helmet());
} else {
  app.use(logger("dev"));
}
app.use(cors());

//옛날엔 body-parser 모듈 썼는데 이젠 express 내장 객체되어서 req.body 내용 파싱할 때 이렇게 설정하면 됌.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//passport 모듈
app.use(cookieParser());
app.use(passport.initialize());
passportConfig();

app.use("/login", LoginRouter);
//미들웨어로 auth를 넣어서 로그인 검증
app.use("/api", passport.authenticate("jwt", { session: false }), ApiRouter);

//404 not found 처리
app.get((req, res) => {
  res.status(404).send("not found");
});

//이외의 에러 처리
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

const server = app.listen(port, function () {
  console.log(`Express server has started on port ${port}(http://localhost:${port})`);
});
