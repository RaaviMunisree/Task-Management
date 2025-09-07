
const express=require('express');
const app=express();
const port=process.env.PORT||5000;
app.use(express.json());

const task=require("./routes/taskRoutes");
app.use('/task',task);
app.listen(port,()=>{console.log("Hii Listening")});
