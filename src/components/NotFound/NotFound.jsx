import React from 'react';
import './NotFound.scss';

function NotFound() {
    return ( 
        <div className="not-found">
          <h1>404</h1>
          <p>Oops! Page not found</p>
          <a href={'/books'}>Back to home</a>
        </div>
    );
}

export default NotFound;