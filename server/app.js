require("dotenv").config();
require("express-async-errors");
const express = require("express");
// const cors = require("cors");
const path=require('path')
const app = express();
const  AuthenticateUser=require('./middleware/authentication')

// connect db
const connectDB = require("./db/connect");
// routers
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.set('trust proxy', 1);
app.use(express.static(path.resolve(__dirname,'../client/build')))
app.use(express.json());
// app.use(cors());



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks",AuthenticateUser, tasksRouter);

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
