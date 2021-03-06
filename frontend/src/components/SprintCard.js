import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { Route, withRouter } from "react-router-dom";
import "./SprintCard.css";

function SprintCard(props) {
  //tasks 상태관리는 여기서
  const [tasks, setTasks] = useState([]);

  const taskElement =
    props.tasks &&
    props.tasks.map((item, index) => {
      return <div className="text-muted">{item.task} </div>;
    });

  return (
    <div
      onClick={() => {
        props.history.push("/sprint/" + props.id);
      }}
    >
      <Card>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{taskElement}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default withRouter(SprintCard);
