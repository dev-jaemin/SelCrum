import React, { useState, useRef } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { insertTask, matchTaskWithSprint, confirmTask } from "../modules/task";

import sprints from "../mockup_data/sprints";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

import SprintInfoPage from "../components/SprintInfoPage";
import TaskList from "../components/TaskList";

//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0

function SprintInfoPageContainer(props) {
  const [name, setName] = useState("");
  const [btnState, setBtnState] = useState(false);

  const addBtnRef = useRef();
  const submitBtnRef = useRef();
  const taskListRef = useRef();

  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const sprintObj = sprints.data.find(
    (element) => element.sprint_id === parseInt(props.match.params.sprintId)
  );

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();

    if (tasksNotInSprint.length > 0) {
      setBtnState(!btnState);
      taskListRef.current.style = "display:block";
    } else {
      alert("해야할 일이 없습니다.");
    }
  };

  const taskHandler = (e) => {
    e.preventDefault();

    console.log(e.target.id);
    dispatch(matchTaskWithSprint(e.target.id, props.match.params.sprintId));
    setBtnState(!btnState);
    taskListRef.current.style = "display:none";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
    console.log(name);
    console.log(props.tasks);

    let body = {
      name: name,
      tasks: props.tasks,
    };

    /*
    	axios
      	.post("http://localhost:5000/api/projects", body)
      	.then((res) => console.log(res));
		*/
  };

  const tasksNotInSprint = tasks.data
    .map((item) => {
      if (item.sprint_id !== sprintObj.sprint_id) {
        return (
          <ListGroup.Item
            key={item.task_id}
            id={item.task_id}
            onClick={taskHandler}
          >
            {item.task}
          </ListGroup.Item>
        );
      }
    })
    .filter((item) => item !== undefined);

  return (
    <div>
      <SprintInfoPage
        submitHandler={submitHandler}
        sprintObj={sprintObj}
        nameHandler={nameHandler}
        addTaskHandler={addTaskHandler}
        tasks={tasks}
        btnState={btnState}
      />
      <TaskList
        tasks={tasks}
        taskHandler={taskHandler}
        taskListRef={taskListRef}
        taskLi={tasksNotInSprint}
      />
    </div>
  );
}

export default SprintInfoPageContainer;
