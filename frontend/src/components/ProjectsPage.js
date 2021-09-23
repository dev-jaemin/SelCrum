import "./ProjectsPage.css";

function ProjectsPage(props) {
  return (
    <div className="ProjectsPage">
      {props.projectElements ? props.projectElements : {}}
      <button
        className="addProjectBtn"
        onClick={() => {
          props.history.push("/project/postpage");
        }}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
}

export default ProjectsPage;
