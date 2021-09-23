import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitTask } from "../modules/task";

import KanbanPage from "../components/KanbanPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Kanban from "../components/Kanban";

//KanbanPage의 match에 projectId를 받아와서 API서버에 넣어서 통신예정
//api통신할 때 componentDidMount 적당히 활용할 것

function KanbanPageContainer({ match }, props) {
  let projectId = match.params.projectId;
  let KanbanPageUrl = "/project/" + projectId + "/kanban";
  let SprintPageUrl = "/project/" + projectId + "/sprint";
  let apiUrl = "/api/project/" + projectId + "/task";

  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(function (response) {
        dispatch(setInitTask(response.data));
        console.log(tasks);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  const todoTodo = tasks.data.map((item, index) => {
    if (item.todo === 1) {
      return <Kanban task={item.task} />;
    }
  });

  const doingTodo = tasks.data.map((item, index) => {
    if (item.todo === 2) {
      return <Kanban task={item.task} />;
    }
  });

  const doneTodo = tasks.data.map((item, index) => {
    if (item.todo === 3) {
      return <Kanban task={item.task} />;
    }
  });

  return (
    <KanbanPage
      todoTodo={todoTodo}
      doingTodo={doingTodo}
      doneTodo={doneTodo}
      KanbanPageUrl={KanbanPageUrl}
      SprintPageUrl={SprintPageUrl}
    />
  );
}

export default KanbanPageContainer;
