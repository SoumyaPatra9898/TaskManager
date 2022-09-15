import React, { useContext, useState } from 'react'
import TaskContext from '../context/tasks/taskContext'

export const AddTask = () => {
    const context = useContext(TaskContext);
    const { addTask } = context;

    const [task, setTask] = useState({title: "", description: "", priority: "", status: "Todo"});

    const handleClick = (e) => {
        e.preventDefault();
        addTask(task);
        setTask({title: "", description: "", priority: "", status: "Todo"});
        console.log("New note added");
    }

    const onChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    return (
        <div className='container my-1'>
            <h4>Add a new task</h4>
            <form>
                <div className="mb-1">
                    <label className="form-label">Title</label>
                    <input type="text" value={task.title} className="form-control" name='title' onChange={onChange}/>
                </div>
                <div className="mb-1">
                    <label className="form-label">Description</label>
                    <textarea type="text" value={task.description} className="form-control" rows="3" name='description' onChange={onChange}></textarea>
                </div>
                <div className="row">
                    <div className="mb-1 col-6">
                        <label className="form-label">Start Time:</label>
                        <input disabled className="form-control" name='startTime' onChange={onChange}/>
                    </div>
                    <div className="mb-1 col-6">
                        <label className="form-label">End Time:</label>
                        <input disabled className="form-control" name='endTime' onChange={onChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-1 col-1">
                        <label className="form-label">Priority</label>
                        <input type='number' value={task.priority} className="form-control" name='priority' onChange={onChange}/>
                    </div>
                    <div className="mb-1 col-3">
                        <label className="form-label">Status</label>
                        <select defaultValue="Todo" value={task.status} className="form-select" aria-label="Default select example" name='status' onChange={onChange}>
                            <option value="Todo">To do</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
                <hr />
            </form>
        </div>
    )
}
