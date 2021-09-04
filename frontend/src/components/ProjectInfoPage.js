import './ProjectInfoPage.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav} from "react-bootstrap";
import SprintCard from "../components/SprintCard";

function ProjectInfoPage(props) {
	const sprintElements = props.sprints.data.map((item, index) => {
		
		const filteredTask = props.tasks.data.filter(element =>
			element.projectId == props.projectId && element.sprintId == item.id);
		
		return(
			<SprintCard id={item.id} name={item.name} tasks={filteredTask}/>
		);
	});
	
	
  return (
    <div className="ProjectInfoPage">
		<h4>project</h4>
		<label className="color_blue">SelCrum FE</label>
		<h4>term</h4>
		<label className="color_blue">2021/07/24 ~ 2021/08/31</label>
		<h4>sprints</h4>
		{sprintElements}

		<Button className="addSprintBtn" variant="primary">
    		+
  		</Button>
		<Nav variant="pills" defaultActiveKey={props.SprintPageUrl} className="SprintPageNav justify-content-center">
  			<Nav.Item key='1'>
    			<Nav.Link href={props.KanbanPageUrl}>칸반 보드</Nav.Link>
  			</Nav.Item>
  			<Nav.Item key='2'>
    			<Nav.Link href={props.SprintPageUrl}>스프린트</Nav.Link>
  			</Nav.Item>
  		</Nav>
    </div>
	 
  );
}

export default ProjectInfoPage;
