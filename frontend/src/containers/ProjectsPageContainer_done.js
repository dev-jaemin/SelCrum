import { Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import ProjectCard from "../components/ProjectCard";

import ProjectsPage from "../components/ProjectsPage";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] =
  `Bearer ` + cookies.get("token");

function ProjectsPageContainer_done(props) {
  let [projects, setProjects] = useState([]);
  let url =
    "/api/project?userId=" +
    window.localStorage.getItem("userId") +
    "&done=true";
  let projectElements = [];

  //useEffect 안쓰면 무한으로 api요청함. 두 번째 인자(deps배열)을 비워놓으면 컴포넌트가 처음 나타날 때만 호출. 만약 useEffect안에서 사용하는 상태나 props가 있다면 deps안에 넣어줘야함
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setProjects(response.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  if (projects.length > 0) {
    projectElements = projects.map((item, index) => {
      if (item.done) {
        return (
          <div
            onClick={() => {
              props.history.push("/project/" + item.project_id + "/kanban");
            }}
          >
            <ProjectCard
              key={index}
              id={item.project_id}
              name={item.name}
              info={item.info}
              start_date={moment(item.start_date).format("YYYY-MM-DD")}
              end_date={moment(item.end_date).format("YYYY-MM-DD")}
            />
          </div>
        );
      }
    });
    return <ProjectsPage projectElements={projectElements} />;
  } else {
    return (
      <button
        className="addProjectBtn"
        onClick={() => {
          props.history.push("/project/postpage");
        }}
      >
        {" "}
        +{" "}
      </button>
    );
  }
}

export default ProjectsPageContainer_done;
