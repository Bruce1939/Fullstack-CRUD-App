import React from 'react';
import { Link } from 'react-router-dom';

const FetchError = ({ fetchError }) => {
  return (
    <div className="fetch-error">
        <p>{fetchError}</p>
        <Link to="/">Go back to homepage by clicking here or the app logo</Link>
    </div>
  )
}

export default FetchError;