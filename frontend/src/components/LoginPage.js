import "./LoginPage.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, NavLink } from "react-bootstrap";

function LoginPage(props) {
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
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.submitHandler}>
          시작하기
        </Button>
        <Form.Group className="mb-3">
          <NavLink style={{ width: "auto" }} onClick={props.signupPageHandler}>
            새로 시작해볼까요?
          </NavLink>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LoginPage;
