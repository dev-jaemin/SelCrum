
import './IndexPage.css';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import { Route } from 'react-router-dom';

function IndexPage() {
  return (
    <div className="IndexPage">
    	<Header />
		<Route path='/' component={Body} />
		<Footer/>
    </div>
  );
}

export default IndexPage;
