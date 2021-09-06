import './TaskList.css';

import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup} from "react-bootstrap";

function TaskList(props) {
	const taskLi = props.tasks.data.map(item => {
		if(item.sprintId != props.sprintObj.id){
		return (
			<ListGroup.Item key={item.id} id={item.id} onClick={props.taskHandler}>{item.text}</ListGroup.Item>
		);
		}
	});
  return (
    <div className="TaskList">
		<ListGroup>
  			{taskLi}
		</ListGroup>
    </div>
	 
  );
}

export default TaskList;
