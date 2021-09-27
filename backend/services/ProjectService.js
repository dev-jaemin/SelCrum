import { getConnection } from "./db/database.js";

const ProjectService = {};

//Project 관련 서비스
ProjectService.getProjects = async (params) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM projects NATURAL JOIN user_project WHERE user_id=? and done=?",
    [params.userId, params.done === "true"] //그냥 하면 문자열 "true", "false"가 입력된다.
  );

  return result[0];
};

ProjectService.addProject = async (newProject) => {
  await getConnection("INSERT INTO projects set ?", newProject);
};

ProjectService.getProjectById = async (projectId) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM projects WHERE project_id=?",
    projectId
  );

  return result[0];
};

//Sprint 관련 서비스
ProjectService.getSprintById = async (sprintId) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM sprints WHERE sprint_id=?",
    sprintId
  );

  return result[0];
};

ProjectService.getSprintsByProjectId = async (projectId) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM sprints WHERE project_id=?",
    projectId
  );

  return result[0];
};

//Task 관련 서비스
ProjectService.addSprint = async (newSprint) => {
  await getConnection("INSERT INTO sprints set ?", newSprint);
};

ProjectService.getTasksByProjectId = async (projectId) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM tasks NATURAL JOIN task_sprint WHERE project_id=?",
    projectId
  );

  return result[0];
};

ProjectService.getTasksBySprintId = async (sprintId) => {
  let result = [];

  result = await getConnection(
    "SELECT * FROM tasks NATURAL JOIN task_sprint WHERE sprint_id=?",
    sprintId
  );

  return result[0];
};

export default ProjectService;
