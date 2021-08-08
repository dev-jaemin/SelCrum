import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardColumns} from "react-bootstrap";
import './ProjectCard.css';

function ProjectCard() {
  return (

		<Card>
    		<Card.Body>
      			<Card.Title>SelCrum FE 작업</Card.Title>
      			<Card.Text>
        		블라블라블라
      			</Card.Text>
      			<Card.Text>
        			<small className="text-muted">Last updated 3 mins ago</small>
      			</Card.Text>
    		</Card.Body>
  		</Card>
	
	  
  );
}

export default ProjectCard;
