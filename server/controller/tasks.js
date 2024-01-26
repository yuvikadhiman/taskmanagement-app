const Task =require("../model/Tasks");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose=require('mongoose');

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
  };


  const deleteTask = async (req, res) => {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;
  
    const task = await Task.findByIdAndDelete({
      _id: taskId,
      createdBy: userId,
    });
    if (!task) {
      throw new NotFoundError(`No task with id ${taskId}`);
    }
    res.status(StatusCodes.OK).send();
  };



  const getAllTasks = async (req, res) => {
    const { search, status, sort } = req.query;
    console.log(req.query)
    // protected route
    const queryObject = {
      createdBy: req.user.userId,
    };
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }
   
    if (status && status !== "all") {
      queryObject.status = status;
    }
    let result = Task.find(queryObject);

    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }  
    const tasks = await result;
    const totalTask = await Task.countDocuments(queryObject);
    res.status(StatusCodes.OK).json({ tasks, totalTask });
  };

  


  const getJob = async (req, res) => {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;
  
    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    });
    if (!task) {
      throw new NotFoundError(`No job with id ${taskId}`);
    }
    res.status(StatusCodes.OK).json({task});
  };

  
  const updateTask = async (req, res) => {
    const {
      body: {task,description },
      user: { userId },
      params: { id: taskId },
    } = req;
  
    if (task === "" || description === "") {
      throw new BadRequestError("Task or Description fields cannot be empty");
    }
    const tasks = await Task.findByIdAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tasks ) {
      throw new NotFoundError(`No job with id ${taskId}`);
    }
    res.status(StatusCodes.OK).json({tasks});
  };

  module.exports={
    createTask,
    deleteTask,
    getAllTasks,
    getJob ,
    updateTask,
  }