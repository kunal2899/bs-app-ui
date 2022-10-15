import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    const { pathname } = useLocation();
    const BOOKS_PATHNAME = "/books";
    const isOnHomePage = () => pathname === BOOKS_PATHNAME;
    return ( 
        <div className='app-header shadow d-flex align-items-center border-solid'>
            {!isOnHomePage() && <Link className="back" to='/books'><i className="fas fa-arrow-left"></i></Link>}
            <div className="title">{isOnHomePage() ? "Books Page" : "Book Details"}</div>
        </div>
    );
}

export default Header;