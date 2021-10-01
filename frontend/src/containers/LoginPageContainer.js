import React, { useState } from "react";

import { Route } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import axios from "axios";

function LoginPageContainer(props) {
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
      id: id,
      password: password,
    };

    axios
      .post("http://localhost:4000/api/projects", body)
      .then((res) => console.log(res));
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
