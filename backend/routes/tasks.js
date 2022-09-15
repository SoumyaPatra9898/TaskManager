const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
// const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all Tasks using: GET "/api/tasks/fetchalltasks"
router.get("/fetchalltasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Task using: POST "/api/tasks/addtask".
router.post('/addtask',[
    // Can add validation here.
] , async (req, res)=>{
    try {
        const { title, description, startTime, endTime, priority, status } = req.body;
        const task = new Task({
            title, description, startTime, endTime, priority, status
        })
        const savedTask = await task.save()
        res.json(savedTask)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: PUT "/api/tasks/updatetask"
router.put('/updatetask/:id', async (req, res) => {
    const { title, description, startTime, endTime, priority, status } = req.body;
    try {
       // Create a newTask object
       const newTask = {};
       if(title) {newTask.title = title};
       if(description) {newTask.description = description};
       if(startTime) {newTask.startTime = startTime};
       if(endTime) {newTask.endTime = endTime};
       if(priority) {newTask.priority = priority};
       if(status) {newTask.status = status};

       // Find the task to updated and update it
       let task = await Task.findById(req.params.id);
       if(!task) { return res.status(404).send("Not Allowed")}

       task = await Task.findByIdAndUpdate(req.params.id, { $set : newTask }, {new: true})
       res.json({task});
       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletetask".
router.delete('/deletetask/:id', async (req, res) => {
    try{
        // Find the task to be delete and delete it
        let task = await Task.findById(req.params.id);
        if(!task) {return res.status(404).send("Not Found")}

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({"Success": "Task has been deleted", task: task})
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router