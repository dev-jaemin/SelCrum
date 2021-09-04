import './Kanban.css';

function Kanban(props) {
  return (
	  <div className='Kanban'>
	  	<h5>{props.task}</h5>
	  </div>
  );
}

export default Kanban;
