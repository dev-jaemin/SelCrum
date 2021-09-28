import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  matchTaskWithSprint,
  confirmTask,
  setInitTaskForAdd,
} from "../modules/task";

import sprints from "../mockup_data/sprints";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

import SprintAddPage from "../components/SprintAddPage";
import TaskList from "../components/TaskList";

//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0

function SprintAddPageContainer(props) {
  const [name, setName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState("");
  const [deadline, setDeadline] = useState("");
  const [btnState, setBtnState] = useState(false);

  const taskListRef = useRef();

  const tasks = useSelector((state) => state.task);
  //선택된 task들의 아이디를 저장하는 배열, 이 배열로 DB의 task정보를 업데이트 할 것
  const dispatch = useDispatch();

  const newId = 1;

  //task 초기화(sprint_id가 1이였던 것들을 모두 0으로 바꾸기)
  useEffect(() => {
    dispatch(setInitTaskForAdd());
  }, []);

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const deadlineHandler = (e) => {
    e.preventDefault();
    setDeadline(e.target.value);
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

  const removeTaskHandler = (e) => {
    e.preventDefault();

    //sprint=0 -> 아직 스프린트에 적용되지 않았다.
    dispatch(matchTaskWithSprint(e.target.id, 0));
    setSelectedTasks(selectedTasks.filter((item) => item !== e.target.id));
  };

  const taskHandler = (e) => {
    e.preventDefault();

    dispatch(matchTaskWithSprint(e.target.id, newId));

    setSelectedTasks([...selectedTasks, e.target.id]);

    setBtnState(!btnState);
    taskListRef.current.style = "display:none";
  };

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    // state에 저장한 값을 가져옵니다.
    let body = {
      name: name,
      tasks: selectedTasks,
      project_id: props.match.params.projectId,
      end_date: deadline,
    };

    console.log(body);

    axios
      .post("http://localhost:4000/api/sprint", body)
      .then((res) => {
        history.goBack();
        //제출했다면 select된 task들은 todo=2(하고있는중)이 됌. 디스패치가 아니라 디비에 저장해야할듯
        dispatch(confirmTask(selectedTasks));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tasksNotInSprint = tasks.data
    .map((item) => {
      if (item.sprint_id !== newId) {
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
      <SprintAddPage
        submitHandler={submitHandler}
        nameHandler={nameHandler}
        addTaskHandler={addTaskHandler}
        tasks={tasks}
        btnState={btnState}
        newId={newId}
        deadline={deadline}
        deadlineHandler={deadlineHandler}
        removeTaskHandler={removeTaskHandler}
      />
      <TaskList
        tasks={tasks}
        taskHandler={taskHandler}
        taskListRef={taskListRef}
        isInfoPage={false}
        taskLi={tasksNotInSprint}
      />
    </div>
  );
}

export default SprintAddPageContainer;
