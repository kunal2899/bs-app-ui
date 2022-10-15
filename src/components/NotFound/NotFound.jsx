import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
    return ( 
        <div className="not-found">
          <h1>404</h1>
          <p>Oops! Page not found</p>
          <Link to={'/books'}>Back to home</Link>
        </div>
    );
}

export default NotFound;