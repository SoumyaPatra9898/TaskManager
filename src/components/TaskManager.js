import React, { useContext, useEffect, useState, useRef } from 'react'
import TaskContext from '../context/tasks/taskContext';
import { AddTask } from './AddTask';
import TaskItem from './TaskItem';

export const TaskManager = () => {

    const val = useContext(TaskContext);
    const { tasks, getTasks, editTask } = val;
    useEffect(() => {
        getTasks()
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [task, setTask] = useState({ id:"", etitle: "", edescription: "", epriority: "", estatus: "" });

    const updateTask = (currentTask) => {
        ref.current.click();
        setTask({id: currentTask._id, etitle: currentTask.title, edescription: currentTask.description, epriority: currentTask.priority, estatus: currentTask.status });
    }

    const handleClick = (e) => {
        editTask(task.id, task.etitle, task.edescription, task.epriority, task.estatus);
        refClose.current.click();
    }

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddTask />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch edit task
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-1">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name='etitle' value={task.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-1">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control" rows="3" name='edescription' value={task.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="row">
                                    <div className="mb-1 col-6">
                                        <label className="form-label">Start Time:</label>
                                        <input disabled className="form-control" name='startTime' onChange={onChange} />
                                    </div>
                                    <div className="mb-1 col-6">
                                        <label className="form-label">End Time:</label>
                                        <input disabled className="form-control" name='endTime' onChange={onChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-1 col-6">
                                        <label className="form-label">Priority</label>
                                        <input type='number' className="form-control" name='epriority' value={task.epriority} onChange={onChange} />
                                    </div>
                                    <div className="mb-1 col-6">
                                        <label className="form-label">Status</label>
                                        <select value={task.estatus} className="form-select" aria-label="Default select example" name='estatus' onChange={onChange}>
                                            <option value="Todo">To do</option>
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h4>Your Tasks : </h4>
                {tasks.map((task) => {
                    return <TaskItem key={task._id} updateTask={updateTask} task={task} />
                })}
            </div>
        </>
    )
}
