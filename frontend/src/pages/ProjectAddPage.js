import './ProjectAddPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";

//https://darrengwon.tistory.com/337
 

function ProjectAddPage() {
	const [name, setName] = useState('');
	const [goal, setGoal] = useState('');
	const [deadline, setDeadline] = useState('');
	
	const nameHandler = (e) => {
    	e.preventDefault();
    	setName(e.target.value);
  	};

    const goalHandler = (e) => {
    	e.preventDefault();
    	setGoal(e.target.value);
  	};
	
	const deadlineHandler = (e) => {
    	e.preventDefault();
    	setDeadline(e.target.value);
  	};
	
	const submitHandler = (e) => {
    	e.preventDefault();
    	// state에 저장한 값을 가져옵니다.
    	console.log(name);
    	console.log(goal);
		console.log(deadline);
		
    	let body = {
      		name: name,
      		goal: goal,
			deadline: deadline
    	};

		/*
    	axios
      	.post("http://localhost:5000/api/projects", body)
      	.then((res) => console.log(res));
		*/
  };
	
  return (
    <div className="ProjectAddPage">
		<Form onSubmit={submitHandler}>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<Form.Label size="lg">프로젝트 이름</Form.Label>
    			<Form.Control type="text" placeholder="Enter project name" value={name} onChange={nameHandler}/>
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicGoal">
    			<Form.Label>목표</Form.Label>
				<Form.Control as="textarea" rows={3} value={goal} onChange={goalHandler}/>
				{/*<Form.Text className="text-muted">
      				목표 한 가지를 적으시고 등록 버튼을 눌러주세요!
    			</Form.Text>
				<Button className="addGoalBtn">등록</Button>*/}
  			</Form.Group>
  
			<Form.Group className="mb-3" controlId="formBasicDeadline">
    			<Form.Label>기한</Form.Label>
    			<Form.Control type="date" value={deadline} onChange={deadlineHandler}/>
  			</Form.Group>
			  
  			<Button className="addProjectBtn" variant="primary" type="submit">
    			프로젝트 추가
  			</Button>
		</Form>
    </div>
	 
  );
}

export default ProjectAddPage;
