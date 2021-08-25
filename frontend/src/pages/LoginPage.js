import React, {useState} from 'react';
import './LoginPage.css';

import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";


function LoginPage({history}) {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	
	const idHandler = (e) => {
    	e.preventDefault();
    	setId(e.target.value);
  	};

    const passwordHandler = (e) => {
    	e.preventDefault();
    	setPassword(e.target.value);
  	};

	
	const submitHandler = (e) => {
    	e.preventDefault();
    	// state에 저장한 값을 가져옵니다.
		
    	let body = {
      		id: id,
      		password: password
    	};

		/*
    	axios
      	.post("http://localhost:5000/api/projects", body)
      	.then((res) => console.log(res));
		*/
  };
	
  return (
    <div className="LoginPage">
    	<Form>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<Form.Label>ID</Form.Label>
    			<Form.Control type="text" placeholder="아이디" onChange={idHandler}/>
    			
				
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicPassword">
    			<Form.Label>Password</Form.Label>
    			<Form.Control type="password" placeholder="비밀번호" onChange={passwordHandler}/>
  			</Form.Group>
  			<Form.Group className="mb-3" controlId="formBasicCheckbox">
    			<Form.Check type="checkbox" label="Check me out" />
  			</Form.Group>
  			<Button variant="primary" type="submit" onClick={submitHandler}>
    			시작하기
  			</Button>
		</Form>
    </div>
  );
}

export default LoginPage;
