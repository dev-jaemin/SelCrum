import './SprintAddPage.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";


function SprintAddPage(props) {
  return (
    <div className="SprintInfoPage">
		<Form onSubmit={props.submitHandler}>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<h4>스프린트 이름</h4>
				<Form.Control type="text" placeholder={props.sprintObj.name} onChange={props.nameHandler}/>
				<Form.Label className="date">{props.sprintObj.start_date} ~ {props.sprintObj.end_date}</Form.Label>
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicGoal">
    			<h4>해야할 일</h4>
				<ul>
					{props.taskLi}
				</ul>
				<Button className="addTaskBtn">추가</Button>
  			</Form.Group>

  			<Button className="postBtn" variant="primary" type="submit">
    			저장
  			</Button>
		</Form>
    </div>
	 
  );
}

export default SprintAddPage;
