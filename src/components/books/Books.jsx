import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BPagination from "../pagination/BPagination";
import _ from "lodash";
import './Books.scss';

function Books(props) {
  const defaultTotalPages = 1;

  const [ totalPages, setTotalPages ] = useState(defaultTotalPages);
  const [ pageChange, setPageChange ] = useState(false);

  const { location, push } = useHistory();
  
  //Updating the state according to query params provided
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.has("page") && props.setActivePage(parseInt(query.get("page")));
    query.has("limit") && props.setLimit(parseInt(query.get("limit")));
  }, [])

  //Updating value of totalPages in case of any change in books data
  useEffect(() => {
    setTotalPages(Math.ceil(props.totalBooks/props.limit));
  }, [props.totalBooks, props.limit])

  //Toggling flag to fetch books data on page change
  useEffect(() => {
    if(pageChange) {
      push({ search: `?page=${props.activePage}&limit=${props.limit}` });
      if(!props.fetching) props.fetchData(true);
      setPageChange(false);
    }
  }, [ pageChange ])

  const handlePageChange = (e, viaControls=null) => {
    //If through next/prev controls
    if(!viaControls) props.setActivePage(parseInt(e.target.innerHTML));
    else {
      const activePage = props.activePage;
      switch(viaControls) {
        case "prev": activePage > 1 && props.setActivePage(activePage-1); break;
        case "next": activePage < totalPages && props.setActivePage(activePage+1); break;
        default: return;
      }
    }
    setPageChange(true);
  }

  const renderBooksList = () => {
    return _.values(props.books).map((book) => (
      <div className="book d-flex w-auto shadow rounded" key={book.identifier}>
        <div className="main-content">
          <h2 className="title">{book.name}</h2>
          <p className="text-wrap-dots">{book.description}</p>
        </div>
        <div className="side-content">
          {props.renderRating(book.avg_rating)}
          <Link to={`/books/${book.identifier}`}>View details</Link>
        </div>
      </div>
    ));
  };

  return (
    <>
      {props.isLoading ? (
        props.renderScreen("Loading...")
      ) : props.totalBooks === 0 || _.values(props.books).length === 0 ? (
        props.renderScreen("No books found")
      ) : (
        <>
          <div className="books-list mb-3">{renderBooksList()}</div>
          {props.totalBooks > props.limit && (
            <div className="d-flex justify-content-center w-100">
              <BPagination
                handlePageChange={handlePageChange}
                pages={totalPages}
                active={props.activePage}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Books;
