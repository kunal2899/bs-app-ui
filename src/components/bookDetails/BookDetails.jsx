import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { bookService } from '../../services/bookService';
import ReviewRating from '../reviewRating/ReviewRating';
import './BookDetails.scss';

function BookDetails(props) {
    const reviewsRenderLimit = 3;
    const defaultReview = { rating: 0, review: "" };

    const { bookId } = useParams();

    const [ book, setBook ] = useState({});
    const [ isAddReviewModalOpened, toggleAddReviewModal ] = useState(false);
    const [ error, setError ] = useState("");
    const [ review, setReview ] = useState(defaultReview);
    const [ savingLoader, setSavingLoader ] = useState(false);
    const [ isReviewsExpanded, setExpandedReviews ] = useState(false);
    const [ reviews, setReviews ] = useState([]);
    const [ avgRating, setAvgRating ] = useState(0);

    //Setting book data after books data is loaded
    useEffect(() => {
        if(!props.isLoading) {
            const book = props.books[bookId];
            setBook(book);
            setReviews(book?.reviews);
            setAvgRating(book?.avg_rating);
        }
    }, [ props.isLoading ])

    //Adding review
    const saveReview = (review, closeModal) => {
        setSavingLoader(true);
        bookService.addReview(book.id, review).then(res => {
            //Updating review and rating data optimistically
            const updatedReviews = [ ...reviews, review ];
            setAvgRating(updatedReviews.map(review => review.rating).reduce((temp, rating) => temp+rating, 0)/updatedReviews.length);
            setReviews(updatedReviews);
            setSavingLoader(false);
            closeModal();
        })
    }

    //Modal to add review
    const renderAddReviewModal = () => {
        const onRatingChange = (value) => setReview({ ...review, rating: value });
        const onReviewChange = (e) =>
          setReview({ ...review, review: e.target.value });
        const closeModal = () => {
          toggleAddReviewModal(false);
          setReview(defaultReview);
        };
        const addReview = () => {
          const { rating, review: description } = review;
          if (rating === 0 || description === "") {
            setError("Please fill all required fields");
            setTimeout(() => setError(""), 2000);
          } else saveReview(review, closeModal);
        };
        const renderModalBody = () => {
          return (
            <div className="m-body">
              <p className="text-center">
                Would you like to recommend to read this book
              </p>
              <div className="rating mb-4">
                <p>Rating</p>
                <span className="rating-stars">
                  <ReviewRating
                    disabled={false}
                    value={review.rating}
                    onChange={onRatingChange}
                  />
                </span>
              </div>
              <div className="review">
                <p>Review</p>
                <textarea
                  className="r-desc form-control"
                  onChange={onReviewChange}
                ></textarea>
              </div>
            </div>
          );
        };
        const renderModalFooter = () => {
          return (
            <div className="m-footer d-flex w-100 justify-content-between align-items-center border-none">
              <div className="error-space">
                <p className="text-danger">{error}</p>
              </div>
              <div className="controls">
                <input
                  type="button"
                  onClick={addReview}
                  value={savingLoader ? "Saving" : "Save"}
                  className="btn btn-secondary"
                />
                <input
                  type="button"
                  onClick={closeModal}
                  value="Cancel"
                  className="btn btn-danger"
                />
              </div>
            </div>
          );
        };
        return (
          <Modal show onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add review</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderModalBody()}</Modal.Body>
            <Modal.Footer>{renderModalFooter()}</Modal.Footer>
          </Modal>
        );
      };
      
    const toggleExpandReviews = () => setExpandedReviews(prev => !prev);

    const getBookReviews = reviews => !isReviewsExpanded ? reviews.slice(0, reviewsRenderLimit) : reviews;

    const renderBookDetails = () => {
        return (
          <>
            <h2 className="title">{book.name}</h2>
            <hr />
            <p className="description text-justify">
              <strong>Description -</strong> {book.description}
            </p>
            <div className="footer d-flex justify-content-between align-items-center">
              <h4 className="author">Author - {book.author_name}</h4>
              {props.renderRating(avgRating)}
            </div>
            <hr />
          </>
        );
    };
    
    const renderBookReviews = () => {
        const renderDarkButton = (text, onClick) => {
          return (
            <input
              type="button"
              value={text}
              onClick={onClick}
              className="btn btn-dark"
            />
          );
        };
        const renderReviewsList = () => {
          return getBookReviews(reviews).map((review) => (
            <div
              className="review d-flex align-items-center justify-content-between shadow rounded"
              key={review.id}
            >
              {props.renderRating(review.rating)}
              <div className="r-desc text-wrap-dots">{review.review}</div>
            </div>
          ));
        };
        return (
          <div className="reviews d-flex flex-column align-items-center">
            <div className="r-header d-flex justify-content-end w-100 p-2">
              {renderDarkButton("Add review", () => toggleAddReviewModal(true))}
            </div>
            <div className="r-list w-100">{renderReviewsList()}</div>
            {reviews.length > reviewsRenderLimit &&
              renderDarkButton(
                `View ${isReviewsExpanded ? "less" : "more"}`,
                toggleExpandReviews
              )}
          </div>
        );
    };

    return (
        <>
          {isAddReviewModalOpened && renderAddReviewModal()}
          {props.isLoading ? (
            props.renderScreen("Loading...")
          ) : book?.name ? (
            <div className="book-detail">
              {renderBookDetails()}
              {renderBookReviews()}
            </div>
          ) : (
            props.renderScreen("Not such book found")
          )}
        </>
      );
}

export default BookDetails;