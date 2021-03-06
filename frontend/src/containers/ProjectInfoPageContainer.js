import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setInitTask } from "../modules/tasks";
import ProjectInfoPage from "../components/ProjectInfoPage";
import SprintCard from "../components/SprintCard";
import { setInitSprintTaskArr } from "../modules/sprintTaskArr";

//아무리해도 서버에서 쿠키로 Auth검증하는 것이 되지않아 임시로 이렇게 처리
import { Cookies } from "react-cookie";
const cookies = new Cookies();
axios.defaults.headers.common["Authorization"] = `Bearer ` + cookies.get("token");

function ProjectInfoPageContainer(props) {
  const projectId = parseInt(props.match.params.projectId);
  const [currentProject, setCurrentProject] = useState({});
  const [sprints, setSprints] = useState([]);

  const KanbanPageUrl = "/project/" + projectId + "/kanban";
  const SprintPageUrl = "/project/" + projectId + "/sprint";
  const apiUrlForPrj = process.env.REACT_APP_API_URL + "/api/project/" + projectId;
  const apiUrlForTasks = process.env.REACT_APP_API_URL + "/api/project/" + projectId + "/task";
  const apiUrlForSpr = process.env.REACT_APP_API_URL + "/api/project/" + projectId + "/sprint";
  const apiUrlForTaskSpr = process.env.REACT_APP_API_URL + "/api/project/" + projectId + "/task_sprint";
  const apiUrlForComplete = process.env.REACT_APP_API_URL + "/api/project/" + projectId + "/complete";

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const sprintTaskArr = useSelector((state) => state.sprintTaskArr);

  useEffect(() => {
    async function fetchData() {
      const { data: p } = await axios(apiUrlForPrj);
      const { data: s } = await axios(apiUrlForSpr);
      const { data: t } = await axios(apiUrlForTasks);
      const { data: ts } = await axios(apiUrlForTaskSpr);

      //useState()는 동기적으로 실행되는 것이 아니라, (성능 문제로) 기다렸다가 동시에 업데이트한다. 따라서 useState()뒤에 console.log를 찍거나 state값으로 계산할 수 없다!!!
      dispatch(setInitTask(t));
      dispatch(setInitSprintTaskArr(s, ts));

      setCurrentProject(p);
      setSprints(s);
    }
    fetchData();
  }, []);

  //handler
  const addHandler = () => {
    props.history.push("/" + projectId + "/sprint/postpage/page");
  };

  const completeHandler = () => {
    const todoN = tasks.data.filter((element) => element.todo !== 0).length;
    let flag = false;

    if (todoN === 0) {
      flag = window.confirm("프로젝트 잘 마무리하셨나요?");
    } else {
      flag = window.confirm("해야할 일이 남아있어요!\n프로젝트가 끝난게 맞나요?");
    }

    if (flag) {
      window.alert("축하합니다! 당신은 멋진 사람입니다.");

      axios
        .put(apiUrlForComplete)
        .then(() => {})
        .catch((err) => console.error(err));

      props.history.push("/project/done");
    }
  };

  const historyHandler1 = (e) => {
    e.preventDefault();

    props.history.push(KanbanPageUrl);
  };

  const historyHandler2 = (e) => {
    e.preventDefault();

    props.history.push(SprintPageUrl);
  };

  const taskById = (task_id) => {
    for (let t of tasks.data) {
      if (t.task_id === task_id) return t.task;
    }

    return null;
  };

  let sprintElements = [];
  if (sprints.length > 0) {
    sprintElements = sprints.map((element) => {
      const filteredTask =
        sprintTaskArr[element.sprint_id] &&
        sprintTaskArr[element.sprint_id].map((element) => {
          return { task_id: element, task: taskById(element) };
        });

      return <SprintCard id={element.sprint_id} name={element.name} tasks={filteredTask} />;
    });
  }

  return (
    <ProjectInfoPage
      sprints={sprints}
      tasks={tasks}
      project={currentProject[0]}
      sprintElements={sprintElements}
      addHandler={addHandler}
      completeHandler={completeHandler}
      historyHandler1={historyHandler1}
      historyHandler2={historyHandler2}
    />
  );
}

export default ProjectInfoPageContainer;
