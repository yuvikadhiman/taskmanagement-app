const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please provide your Task"],
      maxlength: 70,
    },
    description: {
        type: String,
        required: [true, "Please provide task description"],
        maxlength: 70,
      },
    status: {
      type: String,
      enum: ["completed", "pending", "active"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
