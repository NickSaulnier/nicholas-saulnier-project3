const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');
const ReviewModel = require('./model/review.model')
const router = express.Router();

function validateReview(review) {
    let errorString = "";
    if (!review.title) {
        errorString = "Missing title";
    } else if (!review.content) {
        errorString = "Missing review body";
    } else if (!review.username) {
        errorString = "Missing username";
    }
    return errorString;
}

router.get('/', (request, response) => {
    return ReviewModel.getAllReviews()
        .then(allReviews => {
            response.status(200).send(allReviews);
        })
        .catch(error => {
            response.status.apply(400).send(error);
        })
});

router.get('/:reviewId', (request, response) => {
    const reviewId = request.params.reviewId;
    return ReviewModel.getReviewById(reviewId)
        .then(review => {
            response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', auth_middleware, (request, response) => {
    const title = request.body.title;
    const content = request.body.content;
    const username = request.body.username;
    const year = request.body.year;
    const director = request.body.director;
    let comments = [];

    const review = {
        title: title,
        content: content,
        username: username,
        year: year,
        director: director,
        comments: comments,
        timestamp: Date.now(),
    };

    const errorString = validateReview(review);
    if (errorString) {
        return response.status(400).send(errorString);
    }

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error);
        })
});

router.put('/', (request, response) => {
    const modifiedReview = request.body.review;

    const errorString = validateReview(modifiedReview);
    if (errorString) {
        return response.status(400).send(errorString);
    }

    return ReviewModel.updateReview(modifiedReview)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error);
        })
});

router.delete('/:reviewId', (request, response) => {
    const reviewId = request.params.reviewId;
    return ReviewModel.deleteReviewById(reviewId)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(200).send("Review not found");
        })
})

module.exports = router;