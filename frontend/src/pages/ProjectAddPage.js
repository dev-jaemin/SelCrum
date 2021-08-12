import './ProjectAddPage.css';

import { Route } from 'react-router-dom';

 

function ProjectAddPage() {
  return (
    <div className="ProjectAddPage">
    	<form action='/' method='post'>
			<div>
				<h5>프로젝트 제목</h5>
				<input type='text' />
			</div>
		</form>
    </div>
  );
}

export default ProjectAddPage;
