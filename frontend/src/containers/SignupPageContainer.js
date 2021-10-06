import React, { useEffect, useState } from "react";

import { Route } from "react-router-dom";
import SignupPage from "../components/SignupPage";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function SignupPageContainer(props) {
  useEffect(() => {
    //로그인 되어있는지 확인하고, 되어있으면 회원가입 시키면 안됌.
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
  const [checkPassword, setCheckPassword] = useState("");

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    setCheckPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.

    if (password !== checkPassword) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    let body = {
      user_id: id,
      pw: password,
    };

    console.log(body);

    axios.post("http://127.0.0.1:4000/login/sign_up", body).then((response) => {
      window.alert("회원가입되셨습니다.");
      props.history.push("/login");
    });
  };

  return (
    <SignupPage
      idHandler={idHandler}
      passwordHandler={passwordHandler}
      checkPasswordHandler={checkPasswordHandler}
      submitHandler={submitHandler}
    />
  );
}

export default SignupPageContainer;
