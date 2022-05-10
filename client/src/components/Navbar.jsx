import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcTodoList } from 'react-icons/fc';

const Navbar = () => {

    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

  return (
    <div className="navbar">
        
        <div className="brand-logo">
            <FcTodoList size={20} />
            <Link to="/home">ToDoApp</Link>
        </div>
        
        { !token ? (
            <div className="nav-links">
                <Link to="/">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        ) : (
            <div className="nav-links">
                <Link to="/addtask">Create Task</Link>
                <Link to="#" onClick={handleLogout}>Logout</Link>
            </div>
        )}
    </div>
  )
}

export default Navbar;