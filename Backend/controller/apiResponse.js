const Tasks = require("../modules/taskSchema");

// Get all tasks
exports.getAllTask = async (req, res, next) => {
  try {
    const allTasks = await Tasks.find();
    return res.status(200).json({
      success: true,
      message: "Here are all tasks",
      data: allTasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Please provide data for task creation.",
      });
    }

    const newTask = await Tasks.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Task Added",
      data: newTask,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: validationErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// Delete a task
exports.DeleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server error ${error.message}`,
    });
  }
};

// Update a task
exports.updateTasks = async (req, res, next) => {
  try {
    let task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Server side Error: ${error.message}`,
    });
  }
};
