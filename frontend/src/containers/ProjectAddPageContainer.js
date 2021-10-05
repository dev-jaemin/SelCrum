import React, { useState } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import ProjectAddPage from "../components/ProjectAddPage";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] =
  `Bearer ` + cookies.get("token");

//https://darrengwon.tistory.com/337

function ProjectAddPageContainer(props) {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [deadline, setDeadline] = useState("");
  const history = useHistory();

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const infoHandler = (e) => {
    e.preventDefault();
    setInfo(e.target.value);
  };

  const deadlineHandler = (e) => {
    e.preventDefault();
    setDeadline(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
    let body = {
      user_id: window.localStorage.getItem("userId"),
      name: name,
      info: info,
      end_date: deadline,
    };

    console.log(body);

    axios
      .post("http://localhost:4000/api/project", body)
      .then((res) => {
        console.log("post success");
      })
      .catch((err) => {
        console.error(err);
      });
    history.push("/");
  };

  return (
    <ProjectAddPage
      submitHandler={submitHandler}
      name={name}
      nameHandler={nameHandler}
      info={info}
      infoHandler={infoHandler}
      deadline={deadline}
      deadlineHandler={deadlineHandler}
    />
  );
}

export default ProjectAddPageContainer;
