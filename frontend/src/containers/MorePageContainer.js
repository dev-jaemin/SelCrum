import React, { useState } from "react";
import { Route } from "react-router-dom";

import MorePage from "../components/MorePage";

function MorePageContainer(props) {
  const logoutHandler = () => {
    window.localStorage.removeItem("userId");
    window.alert("로그아웃 되었습니다.");
    props.history.push("/login");
  };

  return <MorePage logoutHandler={logoutHandler} />;
}

export default MorePageContainer;
