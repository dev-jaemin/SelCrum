import './KanbanPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";
import Kanban from "../components/Kanban";
import todos from "../mockup_data/todos";



function KanbanPage(props) {
	const todoTodo = todos.data.map((item, index)=>{
		if(item.todo === 1){
			return (
				<Kanban task={item.task} />
			);
		}
	});
	
  return (
    <div className="KanbanPage">
		<h4>해야 해요</h4>
		<div className="board todo">
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
		</div>
		<h4>하고 있어요</h4>
		<div className="board doing">
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
		</div>
		<h4>다 했어요</h4>
		<div className="board done">
			<Kanban task="칸반보드 만들기"/>
			<Kanban task="칸반보드 만들기"/>
		</div>
    </div>
	 
  );
}

export default KanbanPage;
