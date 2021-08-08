
import './IndexPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsPage from './ProjectsPage';
import { Route } from 'react-router-dom';

function IndexPage() {
  return (
    <div className="IndexPage">
    	<Header />
		<Route path='/' component={ProjectsPage} exact/>
		<Route path='/projects' component={ProjectsPage} exact/>
		<Footer/>
    </div>
  );
}

export default IndexPage;
