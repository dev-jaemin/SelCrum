
import './IndexPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsPage from './ProjectsPage';
import ProjectAddPage from './ProjectAddPage';
import KanbanPageContainer from './KanbanPageContainer';
import ProjectInfoPage from './ProjectInfoPage';
import SprintAddPage from './SprintAddPage';
import SprintInfoPage from './SprintInfoPage';
import LoginPage from './LoginPage';
import MorePage from './MorePage';
import { Route } from 'react-router-dom';

function IndexPage() {
  return (
    <div className="IndexPage">
    	<Route path='/' component={Header} />
		<Route path='/' component={ProjectsPage} exact/>
		<Route path='/login' component={LoginPage} exact/>
		<Route path='/project' component={ProjectsPage} exact/>
		<Route path='/project/postpage' component={ProjectAddPage} exact/>
		<Route path='/project/:projectId/kanban' component={KanbanPageContainer} exact/>
		<Route path='/project/:projectId/sprint' component={ProjectInfoPage} exact/>
		<Route path='/sprint/postpage' component={SprintAddPage} exact/>
		<Route path='/sprint/:sprintId' component={SprintInfoPage} exact/>
		<Route path='/more' component={MorePage} exact/>
		<Route path='/' component={Footer} exact/>
		<Route path='/project' component={Footer} />
		<Route path='/sprint' component={Footer} />
		<Route path='/more' component={Footer} />
    </div>
  );
}

export default IndexPage;
