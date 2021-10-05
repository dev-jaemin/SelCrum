import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import MorePage from "../components/MorePage";

import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] =
  `Bearer ` + cookies.get("token");

function MorePageContainer(props) {
  const secessionUrl = "http://127.0.0.1:4000/login";

  const logoutHandler = () => {
    window.localStorage.removeItem("userId");
    cookies.remove("token");
    window.alert("로그아웃 되었습니다.");
    props.history.push("/login");
  };

  const secessionHandler = () => {
    const pw = window.prompt(
      "정말로 탈퇴하시겠습니까?\n비밀번호를 입력하시면 탈퇴처리됩니다."
    );
    if (pw) {
      const body = {
        userId: window.localStorage.getItem("userId"),
        pw: pw,
      };

      //이유는 잘 모르겠지만 delete 메서드는 body를 이런식으로 넣어야 잘 작동합니다.
      axios
        .delete(secessionUrl, { data: body })
        .then((response) => {
          props.history.push("/login");
        })
        .catch((err) => {
          window.alert("비밀번호가 틀립니다.");
          console.error(err);
        });
    }
  };

  return (
    <MorePage
      logoutHandler={logoutHandler}
      secessionHandler={secessionHandler}
    />
  );
}

export default MorePageContainer;
