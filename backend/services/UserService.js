import { getConnection } from "./db/database.js";

const UserService = {
  getUserById: async (uid) => {
    let result = await getConnection("SELECT * FROM user WHERE uid = ?", uid);
    console.log(result[0]);
    return result[0];
  },

  addUser: async (user) => {
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashPassword = createHash("sha512")
      .update(user.pw + salt)
      .digest("hex");
    user.pw = hashPassword;
    user.salt = salt;

    await getConnection("INSERT INTO benefit set ?", user);
  },
};

export default UserService;
