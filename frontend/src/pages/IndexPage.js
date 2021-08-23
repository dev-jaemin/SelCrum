
import './IndexPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsPage from './ProjectsPage';
import ProjectAddPage from './ProjectAddPage';
import KanbanPage from './KanbanPage';
import ProjectInfoPage from './ProjectInfoPage';
import SprintAddPage from './SprintAddPage';
import { Route } from 'react-router-dom';

function IndexPage() {
  return (
    <div className="IndexPage">
    	<Route path='/' component={Header} />
		<Route path='/' component={ProjectsPage} exact/>
		<Route path='/projects' component={ProjectsPage} exact/>
		<Route path='/addProject' component={ProjectAddPage} exact/>
		<Route path='/kanban/:projectId' component={KanbanPage} exact/>
		<Route path='/sprint/:projectId' component={ProjectInfoPage} exact/>
		<Route path='/newsprint' component={SprintAddPage} exact/>
		<Route path='/' component={Footer} />
    </div>
  );
}

export default IndexPage;
