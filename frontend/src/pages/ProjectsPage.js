import './ProjectsPage.css';

import { Route } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import projects from '../mockup_data/projects';


function ProjectsPage({history}) {

	const projectElements = projects.data.map((item, index) => {
		return(
			<div onClick={()=>{console.log(item.id); history.push('/kanban/'+item.id);}}>
				<ProjectCard key={index} id={item.id} name={item.name} info={item.info} start_date={item.start_date} end_date={item.end_date}/>
			</div>
		);
	});
	
	
  return (
    <div className="ProjectsPage">
    	{projectElements}
		<button className="addProjectBtn" onClick={()=>{history.push("/addProject")}}> + </button>
    </div>
  );
}

export default ProjectsPage;
