import express from "express";
import postRouter from "./router/post.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/auth", authRouter);

// 위에서 찾아올 페이지가 없다면
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080);
