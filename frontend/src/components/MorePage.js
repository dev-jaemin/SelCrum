import "./MorePage.css";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router";

function MorePage(props) {
  const history = useHistory();
  return (
    <div className="MorePage">
      <ListGroup>
        <ListGroup.Item onClick={props.logoutHandler}>로그아웃</ListGroup.Item>
        <ListGroup.Item
          onClick={() => {
            history.push("/login/update");
          }}
        >
          회원정보 수정
        </ListGroup.Item>
        <ListGroup.Item onClick={props.secessionHandler}>회원 탈퇴</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default MorePage;
