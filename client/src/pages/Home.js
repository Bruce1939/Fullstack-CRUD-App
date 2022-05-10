import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../keys';
import Task from '../components/Task';
import Search from '../components/Search';
import Loading from '../components/Loading';
import FetchError from '../components/FetchError';

const Home = ({ home, completed, incomplete }) => {

  const navigate = useNavigate();

  useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token')) || null;

      if (!token) {
          navigate('/');
      }
  });

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const url = URL.task;

  const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}` };

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + '/', { headers });
      if (response) setLoading(false);
      
      if (response.data.tasks) {
        setTasks(response.data.tasks);
      }
      
      if (response.data.serverError) {
        setFetchError(response.data.serverError);
      }
    
    } catch (error) {
      setError('Oops!! Something Went Wrong!');
    }
  };

  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const filteredResults = tasks.filter((task) => (
      ((task.task).toLowerCase()).includes(search.toLowerCase())
      ))
    setSearchResults(filteredResults.reverse());
  }, [tasks, search]);

  const handleCheck = async (id) => {
    const newTask = tasks.find((task) => task._id === id);
    const checked = { checked: !newTask.checked };

    try {
      setLoading(true);
      const response = await axios.put(url+`/checked/${id}`, checked, { headers });
      if (response) setLoading(false);

      if (response.data.checkedTask) {
        const checkedTask = { ...newTask, checked: !newTask.checked };
        const newTasks = tasks.map((task) => task._id === id ? checkedTask : task)
        setTasks(newTasks);
      }

      if (response.data.serverError) {
        setFetchError(response.data.serverError);
      }

    } catch (error) {
      setError('Oops!! Something Went Wrong!')
    }      
  };

  const handleUpdate = async (e, payload) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.put(url+ `/update/${payload.id}`, { task: payload.updatedTask }, { headers });
      if (response) setLoading(false);
      
      if (response.data.updatedTask) {
        const newTasks = tasks.map((task) => task._id !== payload.id ? task : response.data.updatedTask);
        setTasks(newTasks);
      }
     
      if (response.data.serverError) {
        setFetchError(response.data.serverError);
      }
    
    } catch (error) {
      setError('Oops!! Something Went Wrong!');
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(url+`/delete/${id}`, { headers });
      if (response) setLoading(false);
      
      if (response.data.taskDeleted) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
      
      if (response.data.serverError) {
        setFetchError(response.data.serverError);
      }
    
    } catch (error) {
      setError('Oops!! Something Went Wrong!');
    }
  };

  const completedTasks = tasks.filter((task) => task.checked === true ? task : null);
  const incompletedTasks = tasks.filter((task) => task.checked === false ? task : null);

  if (loading) return <Loading />;

  if (fetchError) return <FetchError fetchError={fetchError} />;

  return (
    <div className="Home">
    
    { error && <p className="error">{error}</p>}
    
      {(home && !completed && !incomplete) && (
        <div className="search-box">
          {(home && !completed && !incomplete) && (
            <Search 
              search={search} 
              setSearch={setSearch}
            />
          )}
        </div>
      )}
    
      <div className="task-links">
          <div className="task-links-container display">
            <Link to="/completed-tasks">Completed Tasks</Link>
            <Link to="/incomplete-tasks">Incomplete Tasks</Link>
          </div>
      </div>
    
    { ((tasks && home && !completed && !incomplete) && tasks.length < 1) && <p className="no-tasks">You currently have no tasks</p>}

      {(tasks && home && !completed && !incomplete) && (
        searchResults.map((task) => (
          <div className="tasks" key={task._id}>
            <Task 
              key={task._id} 
              task={task} 
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
      )))}
      
      {(!searchResults && home && !completed && !incomplete) && (
        <div>
        {tasks.map((task) => (
          <div className="tasks" key={task._id}>
            <Task 
              key={task._id} 
              task={task} 
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        ))}
        </div>
      )}
      
      {(!search && !home && completed && !incomplete) && (
        <div className="complete-tasks">
 
          <h3 className="task-heading">completed Tasks</h3>
          
          {completedTasks.length < 1 && (<p  className="no-tasks">You currently have no completed tasks</p>)}  
          
          {completedTasks.map((task) => (
            <div className="tasks" key={task._id}>
              <Task 
                key={task._id} 
                task={task} 
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
        </div>
        ))}
      </div>
      )}
      
      {(!search && !home && !completed && incomplete) && (      
        <div className="incomplete-tasks">
        
          <h3 className="task-heading">Incompleted Tasks</h3>
          
          {incompletedTasks.length < 1 && (<p  className="no-tasks">You currently have no incomplete tasks</p>)} 
          
          {incompletedTasks.map((task) => (
            <div className="tasks" key={task._id}>
              <Task 
                key={task._id} 
                task={task} 
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </div>
          ))}
      </div>
      )}

    </div>
  )
}

export default Home;