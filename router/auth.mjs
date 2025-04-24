// 사용자 쪽의 api

import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// 회원가입
// http://127.0.0.1:8000/auth/signup
router.post("/signup", authController.signup);

// 로그인
// http://127.0.0.1:8000/auth/login
router.post("/login", authController.login);

// 로그인 유지
export default router;
