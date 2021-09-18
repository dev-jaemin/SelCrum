import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.render("../public/index.html");
});

export default router;
