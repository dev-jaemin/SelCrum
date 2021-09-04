import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import ProjectAddPage from '../components/ProjectAddPage';


//https://darrengwon.tistory.com/337
 

function ProjectAddPageContainer() {
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
	  <ProjectAddPage submitHandler={submitHandler} name={name} nameHandler={nameHandler} goal={goal} goalHandler={goalHandler} deadline={deadline} deadlineHandler={deadlineHandler}/>
  );
}

export default ProjectAddPageContainer;
