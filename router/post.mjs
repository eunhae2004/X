// 글 작성/수정 등등 관련한 api

import express from "express";
import * as postController from "../controller/post.mjs"; //import 된 모든 것을 가져오겠따

const router = express.Router();

// 모든 포스트 가져오기
// 해당 아이디에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts
// http://127.0.0.1:8080/posts?userid=apple
router.get("/", postController.getPosts);

// 글 번호에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/:id
router.get("/:id", postController.getPost);

// 포스트 쓰기
// POST
// http://127.0.0.1:8080/posts
// json 형태로 입력 후 저장
router.post("/", postController.createPost);

// 포스트 수정하기
// PUT
// http://127.0.0.1:8080/posts/:id
// json 형태로 입력 후 저장
router.put(":id", postController.updatePost);

// 포스트 삭제하기
// DELETE
// http://127.0.0.1:8080/posts/:id
router.delete("/:id", postController.deletePost);

export default router;
