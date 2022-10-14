import React from 'react';
import Rating from 'react-rating';

function ReviewRating(props) {
    return (
        <Rating
            readonly={props.disabled}
            initialRating={props.value}
            fullSymbol={'fas fa-star rating-star'}
            emptySymbol={'far fa-star rating-star'}
            onChange={props.onChange}
        />
    );
}

export default ReviewRating;