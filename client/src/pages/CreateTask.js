import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../keys';
import Loading from '../components/Loading';
import FetchError from '../components/FetchError';

const CreateTask = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token')) || null;
        if (!token) {
            navigate('/');
        }
    });

    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const url = URL.task;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newTask = { task };
        const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || '' }` };
        
        if (!task) return setError('Task cannot be empty!!!')

        try {
            setLoading(true);
            const response = await axios.post(url + '/add', newTask, { headers });
            if (response) setLoading(false);

            if (response.data.newtask) return navigate('/home');

            if (response.data.serverError) {
                setFetchError(response.data.serverError);
            }

        } catch (error) {
            setError('Oops!! Something Went Wrong');
        }
    }

    if (loading) return <Loading />;

    if (fetchError) return <FetchError fetchError={fetchError} />

  return (
    <div className="create-task">
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
            <label htmlFor="task" className="create-task-label">Create Task</label>
            <div className="input-box">
                <input 
                    type="text"
                    id="task"
                    placeholder="Create task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </div>
        </form>
    </div>
  )
}

export default CreateTask;