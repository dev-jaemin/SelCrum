import "./LoginPage.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, NavLink } from "react-bootstrap";

function SignupPage(props) {
  return (
    <div className="LoginPage">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디"
            onChange={props.idHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            onChange={props.passwordHandler}
          />
          <Form.Label>Check Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            onChange={props.checkPasswordHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.submitHandler}>
          가입하기
        </Button>
      </Form>
    </div>
  );
}

export default SignupPage;
