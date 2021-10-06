// config/passport.js
import { getConnection } from "../services/db/database.js";
import bcrypt from "bcrypt";
import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;
const LocalStrategy = Strategy;

const LocalStrategyOption = {
  usernameField: "user_id",
  passwordField: "pw",
};

async function localVerify(user_id, password, done) {
  let user;
  try {
    let sql = "SELECT * FROM users WHERE user_id = ?";
    let params = [user_id];
    let result = await getConnection(sql, params);

    if (!result[0][0]) return done(null, false);
    user = result[0][0];

    const checkPassword = await bcrypt.compare(password, user.pw);
    if (!checkPassword) return done(null, false);

    console.log(user);

    return done(null, user);
  } catch (e) {
    return done(e);
  }
}

const jwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

async function jwtVerift(payload, done) {
  let user;
  try {
    let sql = "SELECT * FROM users WHERE user_id = ?";
    let params = [payload.user_id];
    let result = await getConnection(sql, params);

    if (!result[0][0]) return done(null, false);
    user = result[0][0];

    return done(null, user);
  } catch (e) {
    return done(e);
  }
}

export default function passportConfig() {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
  passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift));
}
