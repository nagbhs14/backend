import express from "express";

//routes import
import userRouter from "./routes/user.route.js"
// import postRouter from "./routes/post.route.js"

const app = express(); // create an express file
app.use(express.json());

//routes declration
app.use("/api/v1/users", userRouter)
// app.use("/api/v1/posts", postRouter)

//example route : http://localhost:4000/api/v1/users/register
export default app;