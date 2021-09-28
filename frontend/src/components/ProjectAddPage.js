import "./ProjectAddPage.css";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

//https://darrengwon.tistory.com/337

function ProjectAddPage(props) {
  return (
    <div className="ProjectAddPage">
      <Form onSubmit={props.submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label size="lg">프로젝트 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={props.name}
            onChange={props.nameHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGoal">
          <Form.Label>목표</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={props.info}
            onChange={props.infoHandler}
          />
          {/*<Form.Text className="text-muted">
      				목표 한 가지를 적으시고 등록 버튼을 눌러주세요!
    			</Form.Text>
				<Button className="addGoalBtn">등록</Button>*/}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDeadline">
          <Form.Label>기한</Form.Label>
          <Form.Control
            type="date"
            value={props.deadline}
            onChange={props.deadlineHandler}
          />
        </Form.Group>

        <Button className="postBtn" variant="primary" type="submit">
          프로젝트 추가
        </Button>
      </Form>
    </div>
  );
}

export default ProjectAddPage;
