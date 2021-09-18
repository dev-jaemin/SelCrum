import "./ProjectsPage.css";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage(props) {
  return (
    <div className="ProjectsPage">
      {props.projectElements}
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
