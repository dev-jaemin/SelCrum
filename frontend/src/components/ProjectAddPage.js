import "./ProjectAddPage.css";
import { Form, Button } from "react-bootstrap";

function ProjectAddPage(props) {
  return (
    <div className="ProjectAddPage">
      <Form onSubmit={props.submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label size="lg">프로젝트 이름</Form.Label>
          <Form.Control type="text" placeholder="Enter project name" value={props.name} onChange={props.nameHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <Form.Label>목표</Form.Label>
          <Form.Control as="textarea" rows={3} value={props.info} onChange={props.infoHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDeadline">
          <Form.Label>기한</Form.Label>
          <Form.Control type="date" value={props.deadline} onChange={props.deadlineHandler} />
        </Form.Group>

        <Button className="postBtn" variant="primary" type="submit">
          프로젝트 추가
        </Button>
      </Form>
    </div>
  );
}

export default ProjectAddPage;
