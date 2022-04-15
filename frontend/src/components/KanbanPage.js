import "./KanbanPage.css";

import { Nav, Form } from "react-bootstrap";

import KanbanEmpty from "./KanbanEmpty";

function KanbanPage(props) {
  return (
    <div className="KanbanPage">
      <Form onSubmit={props.submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            onChange={props.curTaskHandler}
            value={props.curTask}
            placeholder="할 일을 추가하세요(50자 까지)"
            size="10"
            className="kanbanInput"
          />
          <input type="submit" className="addTaskBtn2" variant="primary" value="추가" />
        </Form.Group>
      </Form>
      <h4>해야 해요</h4>
      <div className="board todo">{props.todoTodo.length ? props.todoTodo : <KanbanEmpty />}</div>
      <h4>하고 있어요</h4>
      <div className="board doing">{props.doingTodo.length ? props.doingTodo : <KanbanEmpty />}</div>
      <h4>다 했어요</h4>
      <div className="board done">{props.doneTodo.length ? props.doneTodo : <KanbanEmpty />}</div>
      <Nav variant="pills" defaultActiveKey={1} className="SprintPageNav justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={props.historyHandler1}>
            칸반 보드
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={props.historyHandler2}>
            스프린트
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default KanbanPage;
