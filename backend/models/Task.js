const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    startTime:{
        type: Date,
        default: Date.now,
        required: true
    },
    endTime:{
        type: Date,
        default: Date.now,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = Task;