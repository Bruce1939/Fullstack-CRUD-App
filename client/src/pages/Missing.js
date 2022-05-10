import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Missing = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token')) || null;
      if (!token) {
          navigate('/');
      }
  });

  return (
    <div>Missing</div>
  )
}

export default Missing