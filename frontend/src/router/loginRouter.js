import ProjectsPageContainer from "./ProjectsPageContainer";
import LoginPageContainer from "./LoginPageContainer";
import { Route } from "react-router-dom";

import axios from "axios";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] = `Bearer ` + cookies.get("token");

async function loginRouter() {
  if (!window.localStorage.getItem("userId")) return LoginPageContainer;

  const result = await axios.get("http://localhost:4000/login");

  if (result !== "success") return LoginPageContainer;

  return ProjectsPageContainer;
}

export default loginRouter;
