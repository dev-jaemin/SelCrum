
import './IndexPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsPage from './ProjectsPage';
import ProjectAddPage from './ProjectAddPage';
import KanbanPage from './KanbanPage';
import ProjectInfoPage from './ProjectInfoPage';
import SprintAddPage from './SprintAddPage';
import LoginPage from './LoginPage';
import { Route } from 'react-router-dom';

function IndexPage() {
  return (
    <div className="IndexPage">
    	<Route path='/' component={Header} />
		<Route path='/' component={ProjectsPage} exact/>
		<Route path='/login' component={LoginPage} exact/>
		<Route path='/project' component={ProjectsPage} exact/>
		<Route path='/project/postpage' component={ProjectAddPage} exact/>
		<Route path='/project/kanban/:projectId' component={KanbanPage} exact/>
		<Route path='/project/sprint/:projectId' component={ProjectInfoPage} exact/>
		<Route path='/sprint/:sprintId' component={SprintAddPage} exact/>
		<Route path='/' component={Footer} />
    </div>
  );
}

export default IndexPage;
