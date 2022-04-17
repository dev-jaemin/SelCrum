import { getConnection } from "./db/database.js";

const ProjectService = {};

//Project 관련 서비스
ProjectService.getProjects = async (params) => {
  let result = [];

  result = await getConnection(
    "SELECT user_id, project_id, name, info, start_date, end_date, done, last_check, (SELECT MAX(sprint_id) FROM sprints WHERE project_id=projects.project_id) AS last_sprint FROM projects NATURAL JOIN user_project WHERE user_id=?",
    [params.userId] //그냥 하면 문자열 "true", "false"가 입력된다.
  );

  return result[0];
};

ProjectService.addProject = async (newProject, userId) => {
  const result = await getConnection("INSERT INTO projects set ?", newProject);
  await getConnection("INSERT INTO user_project set ?", {
    user_id: userId,
    project_id: result[0].insertId,
  });
};

ProjectService.getProjectById = async (projectId) => {
  let result = [];

  result = await getConnection("SELECT * FROM projects WHERE project_id=?", projectId);

  return result[0];
};

ProjectService.updateCompleteProject = async (projectId) => {
  const result = await getConnection("UPDATE projects SET done=1 WHERE project_id=?", projectId);

  return result;
};

//Sprint 관련 서비스
ProjectService.getSprintById = async (sprintId) => {
  let result = [];

  result = await getConnection("SELECT * FROM sprints WHERE sprint_id=?", sprintId);

  return result[0];
};

ProjectService.getSprintsByProjectId = async (projectId) => {
  let result = [];

  result = await getConnection("SELECT * FROM sprints WHERE project_id=?", projectId);

  return result[0];
};

ProjectService.addSprint = async (newSprint, tasks) => {
  const result = await getConnection("INSERT INTO sprints set ?", newSprint);
  for (const t of tasks) {
    await getConnection("INSERT INTO task_sprint set ?", {
      task_id: t,
      sprint_id: result[0].insertId,
    });
  }

  return result[0].insertId;
};

ProjectService.updateSprint = async (sprintId, curSprint, tasks) => {
  await getConnection("UPDATE sprints SET name=? WHERE sprint_id=?", [curSprint.name, sprintId]);

  //먼저 task_sprint에서 원래 저장되어 있는 열은 모두 삭제하고
  await getConnection("DELETE FROM task_sprint WHERE sprint_id = ?", sprintId);
  for (const t of tasks) {
    //받아온 taskId 마다 다시 넣어주기
    await getConnection("INSERT INTO task_sprint set ?", {
      task_id: t.task_id,
      sprint_id: sprintId,
    });
    await getConnection("UPDATE tasks SET todo=? WHERE task_id=?", [t.todo, t.task_id]);
  }
  //project의 마지막체크 시간 기록
  await getConnection("UPDATE projects SET last_check=CURDATE() WHERE project_id = ?", curSprint.project_id);
};

//Task 관련 서비스
ProjectService.getTasksByProjectId = async (projectId) => {
  let result = [];

  result = await getConnection(
    //"SELECT tasks.task_id, tasks.project_id, tasks.task, tasks.todo, task_sprint.sprint_id FROM tasks LEFT OUTER JOIN task_sprint ON tasks.task_id = task_sprint.task_id WHERE project_id=?",
    "SELECT * FROM tasks WHERE project_id = ?",
    projectId
  );

  return result[0];
};

ProjectService.getTasksWithSprint = async (projectId) => {
  let result = [];

  result = await getConnection("SELECT DISTINCT task_id, task, todo FROM tasks NATURAL JOIN task_sprint NATURAL JOIN sprints WHERE project_id=?;", projectId);

  return result[0];
};

ProjectService.getTaskSprintBySprintId = async (projectId) => {
  let result = [];

  result = await getConnection("SELECT task_id, sprint_id FROM task_sprint natural join sprints WHERE project_id=?", projectId);

  return result[0];
};

ProjectService.getTasksBySprintId = async (sprintId) => {
  let result = [];

  result = await getConnection("SELECT * FROM tasks NATURAL JOIN task_sprint WHERE sprint_id=?", sprintId);

  return result[0];
};

ProjectService.addTask = async (newTask) => {
  return await getConnection("INSERT INTO tasks set ?", newTask);
};

export default ProjectService;
