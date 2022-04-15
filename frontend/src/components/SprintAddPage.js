import "./SprintInfoPage.css";
import { Form } from "react-bootstrap";

function SprintAddPage(props) {
  return (
    <div className="SprintInfoPage">
      <Form onSubmit={props.submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h4>스프린트 이름</h4>
          <Form.Control type="text" onChange={props.nameHandler} placeholder="#주차" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <h4>해야할 일</h4>
          <ul>{props.taskLi}</ul>
          <input type="button" className="addTaskBtn" value="추가" disabled={props.btnState} onClick={props.addTaskHandler} />
        </Form.Group>

        <input type="button" className="postBtn" variant="primary" value="저장" disabled={props.btnState} onClick={props.submitHandler} />
      </Form>
    </div>
  );
}

export default SprintAddPage;
