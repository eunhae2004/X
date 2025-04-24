// 사용자 쪽의 api

import express from "express";
import * as authController from "../controller/auth.mjs";

const session = require("express-session");
const router = express.Router();

// 회원가입
// http://127.0.0.1:8000/auth/signup
router.post("/signup", authController.signup);

// 로그인
// http://127.0.0.1:8000/auth/login
router.post("/login", authController.login);

// 로그인 유지
router.use(
  session({
    secret: "!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

router.post("/login", (req, res) => {
  const { userid, password } = req.body;
  req.session.user = { userid };
  res.send(`로그인 성공: ${userid}`);
});

router.get("/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user); //session에 user가 있다면
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다.");
  });
});

router.listen(3000, () => {
  console.log("서버 실행 중");
});

export default router;
