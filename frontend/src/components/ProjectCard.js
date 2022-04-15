import { Card } from "react-bootstrap";
import "./ProjectCard.css";

function ProjectCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          <small>{props.info}</small>
        </Card.Text>
        <Card.Text>
          <small className="text-muted">
            {props.start_date} ~ {props.end_date}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
