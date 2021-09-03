import './SprintInfoPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";


import sprints from '../mockup_data/sprints';
import tasks from '../mockup_data/tasks';


//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0


function SprintInfoPage(props) {
	const [name, setName] = useState('');
	
	const sprintObj = sprints.data.find(element => element.id == props.match.params.sprintId);
	const taskLi = tasks.data.map((item, index) => {
		if(item.sprintId == sprintObj.id){
			return(
				<li>{item.text} </li>
			);
		}
	});
	
	const nameHandler = (e) => {
    	e.preventDefault();
    	setName(e.target.value);
  	};

    const tasksHandler = (e) => {
    	e.preventDefault();
    	props.setTasks(e.target.value);
  	};
	
	const submitHandler = (e) => {
    	e.preventDefault();
    	// state에 저장한 값을 가져옵니다.
    	console.log(name);
    	console.log(props.tasks);
		
    	let body = {
      		name: name,
      		tasks: props.tasks,
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
				<Form.Control type="text" placeholder={sprintObj.name} onChange={nameHandler}/>
				<Form.Label className="date">{sprintObj.start_date} ~ {sprintObj.end_date}</Form.Label>
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicGoal">
    			<h4>해야할 일</h4>
				<ul>
					{taskLi}
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
