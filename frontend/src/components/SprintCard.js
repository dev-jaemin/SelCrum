import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import { Route, withRouter } from 'react-router-dom';
import './SprintCard.css';

function SprintCard(props) {
	
  return (
		<div onClick={()=>{props.history.push('/sprint/' + props.id)}}>
		<Card>
  			<Card.Body>
				<Card.Title>{props.name}</Card.Title>
      			<Card.Text>
        			<small className="text-muted">{props.todos}</small>
      			</Card.Text>
			</Card.Body>
		</Card>
	
	  </div>
  );
}

export default withRouter(SprintCard);
