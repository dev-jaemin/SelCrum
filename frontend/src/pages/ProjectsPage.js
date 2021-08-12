import './ProjectsPage.css';

import { Route } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import projects from '../mockup_data/projects';
console.log(projects);

const projectElements = projects.data.map((item, index) => {
	return(
		<ProjectCard name={item.name} info={item.info} start_date={item.start_date} end_date={item.end_date} />
	);
});
 

function ProjectsPage() {
  return (
    <div className="ProjectsPage">
    	{projectElements}
		<button className="addProjectBtn"> + </button>
    </div>
  );
}

export default ProjectsPage;
