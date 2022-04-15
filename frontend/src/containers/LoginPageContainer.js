import React, { useEffect, useState } from "react";

import LoginPage from "../components/LoginPage";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function LoginPageContainer(props) {
  const loginUrl = process.env.REACT_APP_API_URL + "/login";

  useEffect(() => {
    //사용자가 로그인 페이지 접속 시도시
    //일단 로그인 페이지로 접속시키고,
    //이미 인증되어 있는거면 바로 메인화면으로 전환시킴
    if (window.localStorage.getItem("userId")) {
      axios.get(loginUrl).then((res) => {
        if (res.data === "success") {
          props.history.push("/project/doing");
        }
      });
    }
  }, []);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.

    let body = {
      user_id: id,
      pw: password,
    };

    axios
      .post(loginUrl, body)
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          cookies.set("token", token);
          window.localStorage.setItem("userId", body.user_id);

          props.history.push("/project/doing");
        } else {
          window.alert("로그인에 실패했습니다.");
        }
      })
      .catch((err) => {
        window.alert("로그인에 실패했습니다.");
        console.error(err);
      });
  };

  const signupPageHandler = (e) => {
    e.preventDefault();

    props.history.push("/login/sign_up");
  };

  return <LoginPage idHandler={idHandler} passwordHandler={passwordHandler} submitHandler={submitHandler} signupPageHandler={signupPageHandler} />;
}

export default LoginPageContainer;
