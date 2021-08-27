import './KanbanPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";
import Kanban from "../components/Kanban";
import todos from "../mockup_data/todos";

//KanbanPage의 match에 projectId를 받아와서 API서버에 넣어서 통신예정
//api통신할 때 componentDidMount 적당히 활용할 것


function KanbanPage({match}, props) {
	let projectId = match.params.projectId;
	let KanbanPageUrl = '/project/' + projectId + '/kanban';
	let SprintPageUrl = '/project/' + projectId + '/sprint';

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
		<Nav variant="pills" defaultActiveKey={KanbanPageUrl} className="SprintPageNav justify-content-center">
  			<Nav.Item key='1'>
    			<Nav.Link href={KanbanPageUrl}>칸반 보드</Nav.Link>
  			</Nav.Item>
  			<Nav.Item key='2'>
    			<Nav.Link href={SprintPageUrl}>스프린트</Nav.Link>
  			</Nav.Item>
  		</Nav>
    </div>
	 
  );
}

export default KanbanPage;
