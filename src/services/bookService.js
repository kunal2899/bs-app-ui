import http from "./httpService";

const baseUrl = process.env.REACT_APP_API_BASE_URL || "https://book-selling-app-api.herokuapp.com/api";

const getAllBooks = (query) => {
    return http.get(`${baseUrl}/books${query}`);
}

const getBookById = bookId => {
    return http.get(`${baseUrl}/books/${bookId}`);
}

const getAllReviewsByBookId = bookId => {
    return http.get(`${baseUrl}/books/${bookId}/reviews`);
}

const addReview = (bookId, review) => {
    return http.post(`${baseUrl}/books/${bookId}/reviews`, review);
}

const getTotalBookCount = () => {
    return http.get(`${baseUrl}/books/count`);
}

export const bookService = {
    getAllBooks,
    getBookById,
    getAllReviewsByBookId,
    addReview,
    getTotalBookCount
}
