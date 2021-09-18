import KanbanPage from "../components/KanbanPage";

import React, { useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import Kanban from "../components/Kanban";
import tasks from "../mockup_data/tasks";

//KanbanPage의 match에 projectId를 받아와서 API서버에 넣어서 통신예정
//api통신할 때 componentDidMount 적당히 활용할 것

function KanbanPageContainer({ match }, props) {
  let projectId = match.params.projectId;
  let KanbanPageUrl = "/project/" + projectId + "/kanban";
  let SprintPageUrl = "/project/" + projectId + "/sprint";

  const todoTodo = tasks.data.map((item, index) => {
    if (item.todo === 1) {
      return <Kanban task={item.text} />;
    }
  });

  const doingTodo = tasks.data.map((item, index) => {
    if (item.todo === 2) {
      return <Kanban task={item.text} />;
    }
  });

  const doneTodo = tasks.data.map((item, index) => {
    if (item.todo === 3) {
      return <Kanban task={item.text} />;
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
