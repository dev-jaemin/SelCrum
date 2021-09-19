import express from "express";
import multer from "multer";
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
    console.error(err);
    next(err);
  }
});

//프로젝트 정보 post
//get방식은 query에 파라미터를 전달하고 post방식은 body에 숨겨서 보낸다.(body-parser(이제는 express에 내장됌) 사용)
router.post("/project", async function (req, res) {
  let newProject = {
    name: req.body.name,
    info: req.body.info,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  try {
    res.send(await ProjectService.addProject(newProject));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트 정보 응답
router.get("/project/:projectId", async function (req, res) {
  try {
    res.send(await ProjectService.getProjectById(req.params.projectId));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//sprintId가 있을 때 프로젝트 정보 응답
router.get("/sprint/:sprintId", async function (req, res) {
  try {
    res.send(await ProjectService.getSprintById(req.params.sprintId));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트의 스프린트들을 응답하는 함수
router.get("/project/:projectId/sprint", async function (req, res) {
  try {
    res.send(await ProjectService.getSprintsByProjectId(req.params.projectId));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//projectId가 있을 때 프로젝트의 task들을 응답하는 함수
router.get("/project/:projectId/task", async function (req, res) {
  try {
    res.send(await ProjectService.getTasksByProjectId(req.params.projectId));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//sprintId가 있을 때 스프린트의 task들을 응답하는 함수
router.get("/sprint/:sprintId/task", async function (req, res) {
  try {
    res.send(await ProjectService.getTasksBySprintId(req.params.sprintId));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
