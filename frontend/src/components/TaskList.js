import "./TaskList.css";
import { ListGroup } from "react-bootstrap";

function TaskList(props) {
  return (
    <div className="TaskList" style={{ display: "none" }} ref={props.taskListRef}>
      <ListGroup>{props.taskLi}</ListGroup>
    </div>
  );
}

export default TaskList;
