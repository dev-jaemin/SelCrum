import './ProjectInfoPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav} from "react-bootstrap";
import SprintCard from "../components/SprintCard";

import sprints from "../mockup_data/sprints";
import tasks from "../mockup_data/tasks";

//https://darrengwon.tistory.com/337


function ProjectInfoPage(props) {
	
	let projectId = props.match.params.projectId;
	let KanbanPageUrl = '/project/' + projectId + '/kanban';
	let SprintPageUrl = '/project/' + projectId + '/sprint';
	
	const sprintElements = sprints.data.map((item, index) => {
		
		const filteredTask = tasks.data.filter(element =>
			element.projectId == projectId && element.sprintId == item.id);
		
		return(
			<SprintCard id={item.id} name={item.name} tasks={filteredTask}/>
		);
	});
	
	
	
  return (
    <div className="ProjectInfoPage">
		<h4>project</h4>
		<label className="color_blue">SelCrum FE</label>
		<h4>term</h4>
		<label className="color_blue">2021/07/24 ~ 2021/08/31</label>
		<h4>sprints</h4>
		{sprintElements}

		<Button className="addSprintBtn" variant="primary">
    		+
  		</Button>
		<Nav variant="pills" defaultActiveKey={SprintPageUrl} className="SprintPageNav justify-content-center">
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

export default ProjectInfoPage;
