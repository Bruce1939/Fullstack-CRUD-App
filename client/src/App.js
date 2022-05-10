import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import Missing from './pages/Missing';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/home" 
          element={
            <Home 
              home={true} 
              completed={false} 
              incomplete={false} 
            />} 
        />
        <Route 
          path="/completed-tasks" 
          element={
            <Home 
              home={false} 
              completed={true} 
              incomplete={false}
            />}
        />
        <Route 
          path="/incomplete-tasks" 
          element={
            <Home 
              home={false} 
              completed={false} 
              incomplete={true}
            />}
        />
        <Route path="/addtask" element={<CreateTask />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
