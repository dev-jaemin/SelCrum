import './ProjectInfoPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Nav} from "react-bootstrap";
import SprintCard from "../components/SprintCard";

//https://darrengwon.tistory.com/337


 

function ProjectInfoPage({match, history}, props) {
	
	const cardHandler = (e) => {
		e.preventDefault();
		
		const url = '/sprint/' + e.target.id;
		console.log(url);
		history.push(url);
	}
	
	
	let projectId = match.params.projectId;
	let KanbanPageUrl = '/project/' + projectId + '/kanban';
	let SprintPageUrl = '/project/' + projectId + '/sprint';
	
  return (
    <div className="ProjectInfoPage">
		<h4>project</h4>
		<label className="color_blue">SelCrum FE</label>
		<h4>term</h4>
		<label className="color_blue">2021/07/24 ~ 2021/08/31</label>
		<h4>sprints</h4>
		<div onClick={cardHandler}><SprintCard id="1" name="1주차" todos="목업 파일 만들기, 개발환경 셋팅"/></div>
		<div onClick={cardHandler}><SprintCard id="2" name="2주차" todos="목업 파일 만들기, 개발환경 셋팅"/></div>
		<div onClick={cardHandler}><SprintCard id="3" name="3주차" todos="목업 파일 만들기, 개발환경 셋팅"/></div>
		<div onClick={cardHandler}><SprintCard id="4" name="4주차" todos="목업 파일 만들기, 개발환경 셋팅"/></div>

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
