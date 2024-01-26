const express = require("express");
const router = express.Router();
const {
    createTask,
    deleteTask,
    getAllTasks,
    getJob,
    updateTask,

  } = require("../controller/tasks");


router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getJob).delete(deleteTask).patch(updateTask);

module.exports=router;
