import "./MorePage.css";

import React, { useState } from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

function MorePage(props) {
  return (
    <div className="MorePage">
      <ListGroup>
        <ListGroup.Item>회원정보 수정</ListGroup.Item>
        <ListGroup.Item>회원 탈퇴</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default MorePage;
