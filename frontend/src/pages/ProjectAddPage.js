import './ProjectAddPage.css';

import { Route } from 'react-router-dom';

 

function ProjectAddPage() {
  return (
    <div className="ProjectAddPage">
    	<form action='/' method='post'>
			<div>
				<h4>프로젝트 제목</h4>
				<input type='text' name='name'/>
				<h4>목표</h4>
				<input type='text' name='goal'/>
				<button>추가</button>
				<h4>기간</h4>
				<input type='date' name='end_date'/>
			</div>
		</form>
    </div>
  );
}

export default ProjectAddPage;
