import React, {useState, useRef} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {insertTask, matchTaskWithSprint, confirmTask} from '../modules/task';

import sprints from '../mockup_data/sprints';

import SprintInfoPage from '../components/SprintInfoPage';
import TaskList from '../components/TaskList';

//https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0

function SprintInfoPageContainer(props) {
	const [name, setName] = useState('');
	const addBtnRef = useRef();
	const submitBtnRef = useRef();
	
	const tasks = useSelector(state => state.task);
	const dispatch = useDispatch();
	
	const sprintObj = sprints.data.find(element => element.id == props.match.params.sprintId);
	
	const nameHandler = (e) => {
    	e.preventDefault();
    	setName(e.target.value);
  	};
	
	const addTaskHandler = (e) => {
		e.preventDefault();
		
		addBtnRef.current.disabled="true";
		submitBtnRef.current.disabled="true";
	};

    const taskHandler = (e) => {
    	e.preventDefault();
		
		dispatch(matchTaskWithSprint(e.target.id, props.match.params.sprintId));
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
	  <div>
		<SprintInfoPage submitHandler={submitHandler} sprintObj={sprintObj} nameHandler={nameHandler} addTaskHandler={addTaskHandler} tasks={tasks} addBtnRef={addBtnRef} submitBtnRef={submitBtnRef}/>
	  	<TaskList tasks={tasks} taskHandler={taskHandler} sprintObj={sprintObj} />
	  </div>
  );
}

export default SprintInfoPageContainer;
