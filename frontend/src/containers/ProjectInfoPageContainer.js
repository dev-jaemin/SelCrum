import React, {useState} from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import sprints from "../mockup_data/sprints";

import ProjectInfoPage from '../components/ProjectInfoPage';
import SprintCard from '../components/SprintCard';

//https://darrengwon.tistory.com/337


function ProjectInfoPageContainer(props) {
	
	let projectId = props.match.params.projectId;
	let KanbanPageUrl = '/project/' + projectId + '/kanban';
	let SprintPageUrl = '/project/' + projectId + '/sprint';
	
	const tasks = useSelector(state => state.task);
	
	const sprintElements = sprints.data.map((item, index) => {
		
		const filteredTask = tasks.data.filter(element =>
			element.projectId == projectId && element.sprintId == item.id);
		
		return(
			<SprintCard id={item.id} name={item.name} tasks={filteredTask}/>
		);
	});
	
	
  return (
	  <ProjectInfoPage SprintPageUrl={SprintPageUrl} KanbanPageUrl={KanbanPageUrl} sprints={sprints} tasks={tasks} projectId={projectId} />
  );
}

export default ProjectInfoPageContainer;
