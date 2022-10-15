import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Books from "../books/Books";
import BookDetails from "./../bookDetails/BookDetails";
import Header from "./../header/Header";
import _ from "lodash";
import ReviewRating from "../reviewRating/ReviewRating";
import { bookService } from "../../services/bookService";

function Main() {
  const defaultValues = {
    LIMIT: 5,
    ACTIVE_PAGE: 1,
    TOTAL_BOOKS: 1,
    BOOKS: []
  }

  const [ books, setBooks ] = useState(defaultValues.BOOKS);
  const [ totalBooks, setTotalBooks ] = useState(defaultValues.TOTAL_BOOKS);
  const [ isLoading, setLoader ] = useState(false);
  const [ limit, setLimit ] = useState(defaultValues.LIMIT);
  const [ activePage, setActivePage ] = useState(defaultValues.ACTIVE_PAGE);

  //To toggle flag to fetch data from backend
  const [ fetchingData, fetchData ] = useState(true);

  //Memoization used to avoid API calls for data we already fetched
  const [ bookCache, updateCache ] = useState({});

  const { location } = useHistory();

  //To generate key for the bookCache
  const generateCacheKey = () => {
    const query = new URLSearchParams(location.search);
    const getOrDefault = (key, def) => query.has(key) ? query.get(key) : def;
    let key = "";
    key += getOrDefault("page", 1);
    key += `,${getOrDefault("limit", 5)}`;
    return key;
  }

  //function-calls after getting books data
  const postFetchBooks = booksData => {
    setBooks(booksData);
    setLoader(false);
    fetchData(false);
  }

  //API call to fetch books data
  useEffect(() => {
    if (fetchingData) {
      setLoader(true);
      const cacheKey = generateCacheKey();
      if (bookCache[cacheKey]) postFetchBooks(bookCache[cacheKey]);
      else {
        bookService
          .getAllBooks(location.search)
          .then(res => {
            let data = [...res.data];
            setTotalBooks(data[0]?.bookCount);
            data.splice(0, 1);
            const booksData = _.keyBy(data, "identifier");
            updateCache({ ...bookCache, [cacheKey]: booksData });
            postFetchBooks(booksData);
          })
          .catch(err => setLoader(false));
      }
    }
  }, [ fetchingData ]);

  //To render rating stars
  const renderRating = value => {
    const getRatingValue = avgRating =>
      avgRating % 1 === 0 ? avgRating : avgRating.toFixed(1);
    const ratingValue = getRatingValue(parseFloat(value));
    return ratingValue === 0 ?
      <p className="rating">No reviews added</p>
    : (
      <p className="rating">
        <ReviewRating disabled={true} value={ratingValue} />
        &nbsp;{ratingValue}
      </p>
    );
  };

  const renderScreen = text => <div className="not-found" style={{height: '90vh'}}><h3>{text}</h3></div>

  return (
    <>
      {/* App header */}
      <Header />
      <Switch>
        {/* Book details route */}
        <Route
          path="/books/:bookId"
          render={() => (
            <BookDetails
              bookCache={bookCache}
              updateCache={updateCache}
              renderScreen={renderScreen}
              renderRating={renderRating}
            />
          )}
        />
        {/* Books route */}
        <Route
          path="/books"
          render={() => (
            <Books
              activePage={activePage}
              setActivePage={setActivePage}
              limit={limit}
              setLimit={setLimit}
              fetchingData={fetchingData}
              fetchData={fetchData}
              isLoading={isLoading}
              totalBooks={totalBooks}
              renderScreen={renderScreen}
              books={books}
              renderRating={renderRating}
            />
          )}
        />
        {/* Redirect to '/books' path, if no path provided */}
        <Redirect exact from="/" to="/books" />
        {/* Redirect to not found page, if path doesn't matches any routes defined above */}
        <Redirect from="*" to="/not-found" />
      </Switch>
    </>
  );
}

export default Main;
