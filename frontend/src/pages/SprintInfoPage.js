import './SprintInfoPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";

//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0
 

function SprintInfoPage({match}, props) {
	const [name, setName] = useState('');
	const [tasks, setTasks] = useState([]);
	
	const nameHandler = (e) => {
    	e.preventDefault();
    	setName(e.target.value);
  	};

    const tasksHandler = (e) => {
    	e.preventDefault();
    	setTasks(e.target.value);
  	};
	
	const submitHandler = (e) => {
    	e.preventDefault();
    	// state에 저장한 값을 가져옵니다.
    	console.log(name);
    	console.log(tasks);
		
    	let body = {
      		name: name,
      		tasks: tasks,
    	};

		/*
    	axios
      	.post("http://localhost:5000/api/projects", body)
      	.then((res) => console.log(res));
		*/
  };
	
  return (
    <div className="SprintInfoPage">
		<Form onSubmit={submitHandler}>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<h4>스프린트 이름</h4>
				<Form.Control type="text" placeholder="#주차 스프린트" value={name} onChange={nameHandler}/>
				<Form.Label>{props.start_date} ~ {props.start_date}</Form.Label>
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicGoal">
    			<h4>해야할 일</h4>
				<ul>
					<li>이거하기</li>
					<li>저거하기</li>
					<li>요거하기</li>
					<li>그거하기</li>
				</ul>
				<Button className="addTaskBtn">추가</Button>
  			</Form.Group>

  			<Button className="postBtn" variant="primary" type="submit">
    			저장
  			</Button>
		</Form>
    </div>
	 
  );
}

export default SprintInfoPage;
