import "./ProjectInfoPage.css";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav } from "react-bootstrap";

function ProjectInfoPage(props) {
  return (
    <div className="ProjectInfoPage">
      <Button
        variant="success"
        className="completeBtn"
        onClick={props.completeHandler}
      >
        프로젝트 완료
      </Button>
      <h4>project</h4>
      <label className="color_blue">
        {props.project && props.project.name}
      </label>
      <h4>term</h4>
      <label className="color_blue">
        {moment(props.project && props.project.start_date).format("YYYY-MM-DD")}{" "}
        ~ {moment(props.project && props.project.end_date).format("YYYY-MM-DD")}
      </label>
      <h4>sprints</h4>
      <div className="sprintElements">{props.sprintElements}</div>

      <Button
        className="addSprintBtn"
        variant="primary"
        onClick={props.addHandler}
      >
        새 스프린트
      </Button>
      <Nav
        variant="pills"
        defaultActiveKey={2}
        className="SprintPageNav justify-content-center"
      >
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

export default ProjectInfoPage;
