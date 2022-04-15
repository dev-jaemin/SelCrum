import "./LoginPage.css";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";

function PwChangePage(props) {
  const history = useHistory();

  return (
    <div className="LoginPage">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>현재 비밀번호</Form.Label>
          <Form.Control type="password" placeholder="현재 비밀번호" onChange={props.currentPasswordHandler} />
          <Form.Label>변경할 비밀번호</Form.Label>
          <Form.Control type="password" placeholder="변경할 비밀번호" onChange={props.passwordHandler} />
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" placeholder="비밀번호 확인" onChange={props.checkPasswordHandler} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.submitHandler}>
          변경하기
        </Button>
        <Button
          variant="light"
          type="submit"
          onClick={() => {
            history.push("/more");
          }}
          style={{ width: "90px" }}
        >
          취소
        </Button>
      </Form>
    </div>
  );
}

export default PwChangePage;
