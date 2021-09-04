import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import SprintAddPage from '../components/SprintAddPage';

import sprints from '../mockup_data/sprints';
import tasks from '../mockup_data/tasks';
 
function SprintAddPageContainer(props) {
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
    	console.log(tasks);
		
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
	  <SprintAddPage submitHandler={submitHandler} sprintObj={sprintObj} nameHandler={nameHandler} taskLi={taskLi} />
  );
}

export default SprintAddPageContainer;
