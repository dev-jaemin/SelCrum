import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup} from "react-bootstrap";
import './Footer.css';

function Footer({history}) {
  return (
    <div className="Footer">
    	<ButtonGroup className="mb-2 hw100percent">
    		<Button className="menu" onClick={()=>{history.push('/')}}>진행 중</Button>
    		<Button className="menu" onClick={()=>{history.push('/')}}>완료</Button>
    		<Button className="menu" onClick={()=>{history.push('/')}}>더보기</Button>
  		</ButtonGroup>
    </div>
  );
}

export default Footer;
