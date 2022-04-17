import express from "express";
import multer from "multer";
import logger from "../logger.js";
import ProjectService from "../services/ProjectService.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploader = multer({ storage: storage });

//현재 하고 있는/완료한 프로젝트 목록 응답
router.get("/project", async function (req, res, next) {
  try {
    res.send(await ProjectService.getProjects(req.query));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//프로젝트 정보 post
//get방식은 query에 파라미터를 전달하고 post방식은 body에 숨겨서 보낸다.(body-parser(이제는 express에 내장됌) 사용)
router.post("/project", async function (req, res, next) {
  let newProject = {
    name: req.body.name,
    info: req.body.info,
    end_date: req.body.end_date,
  };

  try {
    await ProjectService.addProject(newProject, req.body.user_id);
    res.status(200);
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트 정보 응답
router.get("/project/:projectId", async function (req, res, next) {
  try {
    res.send(await ProjectService.getProjectById(req.params.projectId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트 완료 처리
router.put("/project/:projectId/complete", async function (req, res, next) {
  try {
    res.send(await ProjectService.updateCompleteProject(req.params.projectId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//sprintId가 있을 때 프로젝트 정보 응답
router.get("/sprint/:sprintId", async function (req, res, next) {
  try {
    res.send(await ProjectService.getSprintById(req.params.sprintId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트의 스프린트들을 응답하는 함수
router.get("/project/:projectId/sprint", async function (req, res, next) {
  try {
    res.send(await ProjectService.getSprintsByProjectId(req.params.projectId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//새 스프린트 post
router.post("/sprint", async function (req, res, next) {
  let newSprint = {
    name: req.body.name,
    project_id: req.body.project_id,
    end_date: req.body.end_date,
  };

  try {
    await ProjectService.addSprint(newSprint, req.body.tasks);
    res.status(200);
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//스프린트 정보 업데이트
//기존에 task_sprint로 연결되어있는거 싹 지우고 다시 insert하면 됌
router.put("/sprint", async function (req, res, next) {
  let curSprint = {
    name: req.body.name,
    project_id: req.body.project_id,
  };

  try {
    await ProjectService.updateSprint(
      req.body.sprint_id,
      curSprint,
      req.body.tasks
    );
    res.status(200);
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트의 task들을 응답하는 함수
router.get("/project/:projectId/task", async function (req, res, next) {
  try {
    res.send(await ProjectService.getTasksByProjectId(req.params.projectId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트의 task들 중 스프린트에 붙어있는 task를 응답하는 함수
router.get("/project/:projectId/task/sprint", async function (req, res, next) {
  try {
    res.send(await ProjectService.getTasksWithSprint(req.params.projectId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//task_sprint 객체를 응답하는 함수
router.get("/project/:projectId/task_sprint", async function (req, res, next) {
  try {
    res.send(
      await ProjectService.getTaskSprintBySprintId(req.params.projectId)
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//sprintId가 있을 때 스프린트의 task들을 응답하는 함수
router.get("/sprint/:sprintId/task", async function (req, res, next) {
  try {
    res.send(await ProjectService.getTasksBySprintId(req.params.sprintId));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

//새 task 추가
router.post("/task", async function (req, res, next) {
  let newTask = {
    project_id: req.body.projectId,
    task: req.body.task,
  };

  try {
    res.send(await ProjectService.addTask(newTask));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

export default router;
