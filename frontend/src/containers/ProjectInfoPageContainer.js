import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setInitTask } from "../modules/task";

import ProjectInfoPage from "../components/ProjectInfoPage";
import SprintCard from "../components/SprintCard";

//https://darrengwon.tistory.com/337

const api = async (url, setState) => {
  const { data: result } = await axios(url);
  setState(result);
};

const apiTask = async (url, dispatch) => {
  const { data: result } = await axios(url);
  dispatch(setInitTask(result));
};

function ProjectInfoPageContainer(props) {
  const projectId = parseInt(props.match.params.projectId);
  const [currentProject, setCurrentProject] = useState({});
  const [sprints, setSprints] = useState([]);

  const KanbanPageUrl = "/project/" + projectId + "/kanban";
  const SprintPageUrl = "/project/" + projectId + "/sprint";

  const apiUrlForPrj = "/api/project/" + projectId;
  //const apiUrlForTasks = "/api/project/" + projectId + "/task";
  const apiUrlForSpr = "/api/project/" + projectId + "/sprint";

  const tasks = useSelector((state) => state.task);
  console.log(tasks);
  //const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      api(apiUrlForPrj, setCurrentProject);
      //apiTask(apiUrlForTasks, dispatch);
      api(apiUrlForSpr, setSprints);
    }
    fetchData();
  }, []);

  const addHandler = () => {
    props.history.push("/" + projectId + "/sprint/postpage/page");
  };

  let sprintElements = [];

  if (sprints !== undefined) {
    sprintElements = sprints.map((item, index) => {
      const filteredTask = tasks.data.filter(
        (element) =>
          element.project_id === projectId &&
          element.sprint_id === item.sprint_id
      );

      return (
        <SprintCard id={item.sprint_id} name={item.name} tasks={filteredTask} />
      );
    });
  }

  return (
    <ProjectInfoPage
      SprintPageUrl={SprintPageUrl}
      KanbanPageUrl={KanbanPageUrl}
      sprints={sprints}
      tasks={tasks}
      project={currentProject[0]}
      sprintElements={sprintElements}
      addHandler={addHandler}
    />
  );
}

export default ProjectInfoPageContainer;
