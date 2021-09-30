import "./SprintInfoPage.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function SprintAddPage(props) {
  /*
  const taskLi = props.tasks.data.map((item, index) => {
    if (item.sprint_id == props.newId) {
      return (
        <li onClick={props.removeTaskHandler} id={item.task_id}>
          {item.task}{" "}
        </li>
      );
    }
  });*/

  return (
    <div className="SprintInfoPage">
      <Form onSubmit={props.submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h4>스프린트 이름</h4>
          <Form.Control
            type="text"
            onChange={props.nameHandler}
            placeholder="#주차"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <h4>해야할 일</h4>
          <ul>{props.taskLi}</ul>
          <input
            type="button"
            className="addTaskBtn"
            value="추가"
            disabled={props.btnState}
            onClick={props.addTaskHandler}
          />
        </Form.Group>
        {/*
        <Form.Group className="mb-3" controlId="formBasicDeadline">
          <h4>마감일</h4>
          <Form.Control
            type="date"
            value={props.deadline}
            onChange={props.deadlineHandler}
          />
        </Form.Group>
        */}

        <input
          type="button"
          className="postBtn"
          variant="primary"
          value="저장"
          disabled={props.btnState}
          onClick={props.submitHandler}
        />
      </Form>
    </div>
  );
}

export default SprintAddPage;
