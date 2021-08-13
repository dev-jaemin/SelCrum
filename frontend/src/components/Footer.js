import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup} from "react-bootstrap";
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
    	<ButtonGroup className="mb-2 hw100percent">
    		<Button className="menu">진행 중</Button>
    		<Button className="menu">완료</Button>
    		<Button className="menu">더보기</Button>
  		</ButtonGroup>
    </div>
  );
}

export default Footer;
