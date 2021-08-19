import './KanbanPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";
import Kanban from "../components/Kanban";
import todos from "../mockup_data/todos";

//KanbanPage의 match에 projectId를 받아와서 API서버에 넣어서 통신예정



function KanbanPage({match}) {
	console.log(match.params.projectId);
	
	const todoTodo = todos.data.map((item, index)=>{
		if(item.todo === 1){
			return (
				<Kanban task={item.task} />
			);
		}
	});
	
	const doingTodo = todos.data.map((item, index)=>{
		if(item.todo === 2){
			return (
				<Kanban task={item.task} />
			);
		}
	});
	
	const doneTodo = todos.data.map((item, index)=>{
		if(item.todo === 3){
			return (
				<Kanban task={item.task} />
			);
		}
	});
	
  return (
    <div className="KanbanPage">
		<h4>해야 해요</h4>
		<div className="board todo">
			{todoTodo}
		</div>
		<h4>하고 있어요</h4>
		<div className="board doing">
			{doingTodo}
		</div>
		<h4>다 했어요</h4>
		<div className="board done">
			{doneTodo}
		</div>
    </div>
	 
  );
}

export default KanbanPage;
