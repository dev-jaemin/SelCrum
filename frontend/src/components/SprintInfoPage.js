import "./SprintInfoPage.css";
import { Form } from "react-bootstrap";

function SprintInfoPage(props) {
  return (
    <div className="SprintInfoPage">
      <Form onSubmit={props.submitHandler} className="infoForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h4>스프린트 이름</h4>
          <Form.Control type="text" onChange={props.nameHandler} value={props.sprintObj && props.sprintObj.name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <h4>
            해야할 일<small className="bracket_small">(다 했다면 클릭하세요!)</small>
          </h4>
          <ul>{props.doingTaskLi}</ul>
          <input type="button" className="addTaskBtn" value="추가" disabled={props.btnState} onClick={props.addTaskHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <h4>다했어요</h4>
          <ul>{props.doneTaskLi}</ul>
        </Form.Group>
      </Form>
      <input type="button" className="postBtn" variant="primary" value="저장" disabled={props.btnState} onClick={props.submitHandler} />
    </div>
  );
}

export default SprintInfoPage;
