import './ProjectAddPage.css';

import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";

 

function ProjectAddPage() {
  return (
    <div className="ProjectAddPage">
		<Form>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<Form.Label size="lg">Project Name</Form.Label>
    			<Form.Control type="text" placeholder="Enter project name" />
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicPassword">
    			<Form.Label>Goal</Form.Label>
    			<Form.Control type="text" placeholder="목표" />
				<Form.Text className="text-muted">
      				목표 한 가지를 적으시고 등록 버튼을 눌러주세요!
    			</Form.Text>
				<Button className="addGoalBtn">등록</Button>
  			</Form.Group>
  
			<Form.Group className="mb-3" controlId="formBasicPassword">
    			<Form.Label>Deadline</Form.Label>
    			<Form.Control type="date"/>
  			</Form.Group>
			  
  			<Button variant="primary" type="submit">
    			프로젝트 추가
  			</Button>
		</Form>
    </div>
	 
  );
}

export default ProjectAddPage;
