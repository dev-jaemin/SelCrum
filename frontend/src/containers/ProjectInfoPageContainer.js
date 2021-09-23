import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setInitTask } from "../modules/task";

import sprints from "../mockup_data/sprints";

import ProjectInfoPage from "../components/ProjectInfoPage";
import SprintCard from "../components/SprintCard";

//https://darrengwon.tistory.com/337

function ProjectInfoPageContainer(props) {
  let projectId = props.match.params.projectId;
  const [currentProject, setCurrentProject] = useState({});

  let KanbanPageUrl = "/project/" + projectId + "/kanban";
  let SprintPageUrl = "/project/" + projectId + "/sprint";
  let apiUrl = "/api/project/" + projectId;
  let apiUrlForTasks = "/api/project/" + projectId + "/task";

  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(apiUrlForTasks)
      .then(function (response) {
        dispatch(setInitTask(response.data));
        console.log(tasks);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(function (response) {
        setCurrentProject(response.data[0]);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  const sprintElements = sprints.data.map((item, index) => {
    const filteredTask = tasks.data.filter(
      (element) => element.projectId == projectId && element.sprintId == item.id
    );

    return <SprintCard id={item.id} name={item.name} tasks={filteredTask} />;
  });

  return (
    <ProjectInfoPage
      SprintPageUrl={SprintPageUrl}
      KanbanPageUrl={KanbanPageUrl}
      sprints={sprints}
      tasks={tasks}
      project={currentProject}
      sprintElements={sprintElements}
    />
  );
}

export default ProjectInfoPageContainer;
