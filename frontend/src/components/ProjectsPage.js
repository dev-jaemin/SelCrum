import { useHistory } from "react-router";
import "./ProjectsPage.css";

function ProjectsPage(props) {
  //props.history는 리액트 컴포넌트가 자손 밑으로 많이 내려오면 사용할 수 없음
  const history = useHistory();

  return (
    <div className="ProjectsPage">
      {props.projectElements ? props.projectElements : <div>완료한 프로젝트가 없습니다.</div>}
      {!props.isDone && (
        <button
          className="addProjectBtn"
          onClick={() => {
            history.push("/project/postpage");
          }}
        >
          새 프로젝트
        </button>
      )}
    </div>
  );
}

export default ProjectsPage;
