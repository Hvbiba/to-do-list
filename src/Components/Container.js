import React, { useEffect, useState } from 'react';

export default function Container() {
    // Initialize state with tasks from localStorage or [ ]
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [newTask, setNewTask] = useState(''); // store new task
    const [newDate, setNewDate] = useState(''); // store new task date

    // Save tasks to localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Function to add a new task
    function addTask() {
        if (newTask.trim()) {
            const taskObject = {
                newTask,
                newDate,
                status: 'Pending',
            };
            setTasks([...tasks, taskObject]); // Update tasks state
            setNewTask('');
            setNewDate('');
        }
    }

    // Function to clear all tasks
    function deleteAll() {
        setTasks([]);
        setNewTask('');
        setNewDate('');
    }

    // Function to delete a task by index
    function deleteTask(index) {
        const updatedTasks = [...tasks]; // Create a copy of the tasks array
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    // Function to change task status
    function doneTask(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending'};
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    return (
        <div className='bg-dark text-light d-flex flex-column justify-content-center align-items-center' id='home-page'>
            <div className='container' id='container-box'>
                <h2 className='text-center p-3'>To-Do List</h2>
                <div className='inputs d-flex gap-2'>
                    <input
                        type='text'
                        placeholder='Add Task'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <input
                        type='date'
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <button type="button" className="btn btn-light" onClick={addTask}>Add</button>
                </div>
                <div className='del-all'>
                    <button type="button" className="btn btn-light float-end my-2" onClick={deleteAll}>
                        Delete All
                    </button>
                </div>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.newTask}</td>
                                    <td>{task.newDate}</td>
                                    <td className={task.status === 'Completed'?'text-success':null}>{task.status}</td>
                                    <td>
                                        <div className='actions fs-5'>
                                            <i className="fa fa-pencil px-1 text-warning" aria-hidden="true"></i>
                                            <i
                                                className="fa fa-check px-1 text-success"
                                                aria-hidden="true"
                                                onClick={() => doneTask(index)}
                                            ></i>
                                            <i
                                                className="fa fa-trash px-1 text-danger"
                                                aria-hidden="true"
                                                onClick={() => deleteTask(index)}
                                            ></i>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='text-center py-2'>No task found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
