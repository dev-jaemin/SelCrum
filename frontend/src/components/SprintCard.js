import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import './SprintCard.css';

function SprintCard(props) {
  return (

		<Card>
  			<Card.Body>
				<Card.Title>{props.name}</Card.Title>
      			<Card.Text>
        			<small className="text-muted">{props.todos}</small>
      			</Card.Text>
			</Card.Body>
		</Card>
	
	  
  );
}

export default SprintCard;
