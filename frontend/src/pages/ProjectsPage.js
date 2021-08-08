import './ProjectsPage.css';

import { Route } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function ProjectsPage() {
  return (
    <div className="ProjectsPage">
    	<ProjectCard />
    </div>
  );
}

export default ProjectsPage;
