import "./LoginPage.css";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

function SignupPage(props) {
  const history = useHistory();

  return (
    <div className="LoginPage">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="아이디" onChange={props.idHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" onChange={props.passwordHandler} />
          <Form.Label>Check Password</Form.Label>
          <Form.Control type="password" placeholder="비밀번호 확인" onChange={props.checkPasswordHandler} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.submitHandler}>
          가입하기
        </Button>
        <Button
          variant="light"
          type="submit"
          onClick={() => {
            history.push("/login");
          }}
          style={{ width: "90px" }}
        >
          취소
        </Button>
      </Form>
    </div>
  );
}

export default SignupPage;
