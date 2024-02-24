const express=require("express");
const { getAllTask, createTask, DeleteTask, updateTasks } = require("../controller/apiResponse");

const router=express.Router();

//get route
router.route('/tasks').get(getAllTask)

//post route
router.route('/newtask').post(createTask)

//Delete request
router.route('/deletetask/:id').delete(DeleteTask)

//Update tasks on database
router.route('/updatetask/:id').put(updateTasks)

module.exports=router