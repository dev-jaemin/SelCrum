import './LoginPage.css';

import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";


function LoginPage({history}) {
	
  return (
    <div className="LoginPage">
    	<Form>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<Form.Label>ID</Form.Label>
    			<Form.Control type="text" placeholder="아이디" />
    			
				
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicPassword">
    			<Form.Label>Password</Form.Label>
    			<Form.Control type="password" placeholder="비밀번호" />
  			</Form.Group>
  			<Form.Group className="mb-3" controlId="formBasicCheckbox">
    			<Form.Check type="checkbox" label="Check me out" />
  			</Form.Group>
  			<Button variant="primary" type="submit">
    			시작하기
  			</Button>
		</Form>
    </div>
  );
}

export default LoginPage;
