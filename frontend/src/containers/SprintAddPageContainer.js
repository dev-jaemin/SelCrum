import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { matchTaskWithSprint, setInitTaskForAdd } from "../modules/tasks";
import {
  matchTask_Sprint,
  removeTask,
  setInitArr,
} from "../modules/sprintTaskArr";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

import SprintAddPage from "../components/SprintAddPage";
import TaskList from "../components/TaskList";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] =
  `Bearer ` + cookies.get("token");

//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0

function SprintAddPageContainer(props) {
  const [name, setName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState("");
  const [deadline, setDeadline] = useState("");
  const [btnState, setBtnState] = useState(false);

  const taskListRef = useRef();

  const tasks = useSelector((state) => state.tasks);
  const sprintTaskArr = useSelector((state) => state.sprintTaskArr);
  const dispatch = useDispatch();

  const curId = 1;

  //task 초기화(sprint_id가 1이였던 것들을 모두 0으로 바꾸기)
  useEffect(() => {
    //dispatch(setInitTaskForAdd());
    dispatch(setInitArr());
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
    //dispatch(matchTaskWithSprint(e.target.id, 0));
    //setSelectedTasks(selectedTasks.filter((item) => item !== e.target.id));
    dispatch(removeTask(curId, parseInt(e.target.id)));
  };

  const taskHandler = (e) => {
    e.preventDefault();

    //dispatch(matchTaskWithSprint(e.target.id, curId));
    dispatch(matchTask_Sprint(curId, [parseInt(e.target.id)]));

    //setSelectedTasks([...selectedTasks, e.target.id]);

    setBtnState(!btnState);
    taskListRef.current.style = "display:none";
  };

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    // state에 저장한 값을 가져옵니다.
    let body = {
      name: name,
      //tasks: selectedTasks,
      tasks: sprintTaskArr[curId],
      project_id: props.match.params.projectId,
      //end_date: deadline,
    };

    console.log(body);

    axios
      .post("http://localhost:4000/api/sprint", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    history.goBack();
  };

  //selectedTask랑 섞인게 문제인듯 중복제거하면서 해당된 sprint아이디 없어짐
  const taskById = (task_id) => {
    for (let t of tasks.data) {
      if (t.task_id === task_id) return t.task;
    }

    return null;
  };
  /*
  const uniqueTaskId = [
    ...new Set(tasks.data.map((item) => (item = item.task_id))),
  ];
  

  let tasksNotInSprint = uniqueTaskId.map((item) => {
    if (item.sprint_id !== curId) {
      return (
        <ListGroup.Item key={item} id={item} onClick={taskHandler}>
          {taskById(item)}
        </ListGroup.Item>
      );
    }
  });*/

  let tasksNotInSprint = tasks.data.map((element) => {
    if (
      sprintTaskArr[curId] &&
      !sprintTaskArr[curId].includes(element.task_id)
    ) {
      return (
        <ListGroup.Item
          key={element.task_id}
          id={element.task_id}
          onClick={taskHandler}
        >
          {element.task}
        </ListGroup.Item>
      );
    }
  });

  //task Listitem 만들기
  let taskLi = [];
  if (sprintTaskArr[curId] !== undefined && sprintTaskArr[curId].length !== 0) {
    taskLi = sprintTaskArr[curId].map((item, index) => {
      return (
        <li onClick={removeTaskHandler} id={item}>
          {taskById(item)}{" "}
        </li>
      );
    });
  }

  return (
    <div>
      <SprintAddPage
        submitHandler={submitHandler}
        nameHandler={nameHandler}
        addTaskHandler={addTaskHandler}
        tasks={tasks}
        taskLi={taskLi}
        btnState={btnState}
        curId={curId}
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
