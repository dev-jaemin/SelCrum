import { Route } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import projects from '../mockup_data/projects';

import ProjectsPage from '../components/ProjectsPage';


function ProjectsPageContainer(props) {

	const projectElements = projects.data.map((item, index) => {
		return(
			<div onClick={()=>{console.log(item.id); props.history.push('/project/'+item.id+'/kanban');}}>
				<ProjectCard key={index} id={item.id} name={item.name} info={item.info} start_date={item.start_date} end_date={item.end_date}/>
			</div>
		);
	});
	
	
  return (
	  <ProjectsPage projectElements={projectElements} />
  );
}

export default ProjectsPageContainer;
