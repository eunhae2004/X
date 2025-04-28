/*

    Authorization
    - 본인의 신원을 증명하는 과정

    Authorization 헤더
    - http 요청을 보낼 때 헤더(Headers)라는 곳에 "추가정보"를 담을 수 있다.
    - 인증정보를 담는 표준 위치가 Autorization 헤더임.

    Bearer
    - Authorization에 실을 수 있는 방식 (타입)중 하나
    - Bearer는 토큰(token)을 가지고 있다는 것 자체로 인증한다.
        Authorization: Bearer <토큰>

*/

import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";

const AUTH_ERROR = { message: "인증 에러" };

export const isAuth = async (req, res, next) => {
  // authorization을 열어 본다.
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  //   authHeader가 존재하지 않거나, authHeader에 Bearer로 시작하는 것이 존재화지 않는다면 error로 처리해 돌려보낸다.
  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    console.log("헤더 에러");
    return resizeBy.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  //   Bearer  adsfjieowajfsdfcjklnewioafcjsdckl
  //  --> 띄쓰 기준 1번 토큰만 가져오겠다
  console.log(token);
  // token 검증

  // 시크릿키로 디코딩해 대조해 본다.
  jwt.verify(token, "abcdefg1234%^&*", async (error, decoded) => {
    if (error) {
      // 디코딩이 되지 않는다 --> 조작한 토큰
      console.log("토큰 에러");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded.id);
    const user = await authRepository.findByid(decoded.id);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user.id: ", user.id);
    console.log("user.userid: ", user.userid);
    req.userid = user.userid;
    next();
  });
};
