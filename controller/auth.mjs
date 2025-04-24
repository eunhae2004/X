import e from "express";
import * as authRepository from "../data/auth.mjs";

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.creatUser(userid, password, name, email);
  if (users) {
    res.status(201).json(users); //users를 json 형태로 리턴
  }
}

export async function login(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    res.status(200).json(`${userid}님 로그인 완료!`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님, id 또는 password를 확인하세요.` });
  }
}
