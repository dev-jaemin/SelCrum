import React, { useEffect, useState } from "react";

import { Route } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function LoginPageContainer(props) {
  useEffect(() => {
    //일단 로그인 페이지로 접속시키고, 이미 인증되어 있는거면 바로 메인화면으로 돌리기
    if (window.localStorage.getItem("userId")) {
      axios.get("http://127.0.0.1:4000/login").then((res) => {
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
      .post("http://localhost:4000/login", body)
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          cookies.set("token", token);
          window.localStorage.setItem("userId", body.user_id);

          props.history.push("/project/doing");
        } else {
          window.alert("비밀번호가 틀립니다.");
        }
      })
      .catch((err) => {
        window.alert("비밀번호가 틀립니다.");
        console.error(err);
      });
  };

  return (
    <LoginPage
      idHandler={idHandler}
      passwordHandler={passwordHandler}
      submitHandler={submitHandler}
    />
  );
}

export default LoginPageContainer;
