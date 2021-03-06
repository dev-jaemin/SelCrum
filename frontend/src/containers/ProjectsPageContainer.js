import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ProjectCard from "../components/ProjectCard";
import ProjectsPage from "../components/ProjectsPage";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] = `Bearer ` + cookies.get("token");

const checkLastUpdate = (projects) => {
  if (projects.length === 0) return;

  const today = new Date();

  for (const p of projects) {
    for (let d = new Date(p.last_check); d <= today; d.setDate(d.getDate() + 1)) {
      if (d.getDay(d) === 6) {
        window.alert(p.name + "\n주간 점검 부탁드립니다!");
        return;
      }
    }
  }
};

function ProjectsPageContainer(props) {
  let isDone = props.match.url === "/project/done";
  let [projects, setProjects] = useState([]);
  let url = process.env.REACT_APP_API_URL + "/api/project?userId=" + window.localStorage.getItem("userId");
  let projectElements = [];

  //useEffect 안쓰면 무한으로 api요청함. 두 번째 인자(deps배열)을 비워놓으면 컴포넌트가 처음 나타날 때만 호출. 만약 useEffect안에서 사용하는 상태나 props가 있다면 deps안에 넣어줘야함
  useEffect(() => {
    axios
      .get(url)
      .then(function ({ data }) {
        setProjects(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    checkLastUpdate(projects, props.history);
  }, [projects]);

  projectElements =
    projects &&
    projects.map((item, index) => {
      if (item.done == isDone) {
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

  return <ProjectsPage projectElements={projectElements} isDone={isDone} />;
}

export default React.memo(ProjectsPageContainer);
