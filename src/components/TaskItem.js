import React, { useContext } from "react";
import TaskContext from "../context/tasks/taskContext";

const TaskItem = (props) => {
    const context = useContext(TaskContext);
    const { deleteTask } = context;
    const {task, updateTask} = props;

    return (
        <div className='card mb-1'>
            <div className='card-body'>
                <div className="row ">
                    <div className="col-6">
                        <b>{task.title}</b>
                        <p>{task.description}</p>
                    </div>
                    <div className="col-2">
                        <p className='m-0 small'>StartTime : {task.startTime}</p>
                        <p className='m-0 small'>EndTime : {task.endTime}</p>
                    </div>
                    <div className="col-2">
                        <p className='m-0 small'>Priority: {task.priority}</p>
                        <p className='m-0 small'>Status: {task.status}</p>
                    </div>
                    <div className="col-1">
                        <i className="m-2 fa-solid fa-pen-to-square" onClick={() => {updateTask(task)}}></i>
                        <i className="m-2 fa-solid fa-trash-can" onClick={() => {deleteTask(task._id)}}></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;