require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const userRouter = require('./server/api/users/user.router');
const QuestionRouter = require('./server/api/questions/question.router')
const AnswerRouter = require('./server/api/answers/answers.router')

const AuthRouter = require('./server/api/users/auth.router')

const CommentRouter = require('./server/api/comments/comments.router')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use('/api/questions', QuestionRouter)
app.use('/api/questions/answers', AnswerRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/comments', CommentRouter)


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));