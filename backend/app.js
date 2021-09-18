import express from "express";

import MainRouter from "./routes/main.js";
import LoginRouter from "./routes/LoginRouter.js";
import ApiRouter from "./routes/ApiRouter.js";
import session from "express-session";
import logger from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import bodyParser from "body-parser";

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
    key: "sid",
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", MainRouter);
app.use("/login", LoginRouter);
app.use("/api", ApiRouter);

const server = app.listen(port, function () {
  console.log("Express server has started on port 3000(http://localhost:3000)");
});
