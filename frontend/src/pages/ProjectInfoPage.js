import './ProjectInfoPage.css';

import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import SprintCard from "../components/SprintCard";

//https://darrengwon.tistory.com/337
 

function ProjectInfoPage() {
	
	
  return (
    <div className="ProjectInfoPage">
		<h4>project</h4>
		<label className="color_blue">SelCrum FE</label>
		<h4>term</h4>
		<label className="color_blue">2021/07/24 ~ 2021/08/31</label>
		<h4>sprints</h4>
		<SprintCard name="1주차" todos="목업 파일 만들기, 개발환경 셋팅"/>
		<SprintCard name="2주차" todos="목업 파일 만들기, 개발환경 셋팅"/>
		<SprintCard name="3주차" todos="목업 파일 만들기, 개발환경 셋팅"/>
		  
    </div>
	 
  );
}

export default ProjectInfoPage;
