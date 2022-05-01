const mongoose = require('mongoose');
const ReviewSchema = require('../schema/review.schema');
const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewById(id) {
    return ReviewModel.findById(id).exec();
}

function getAllReviews() {
    return ReviewModel.find().exec();
}

function updateReview(review) {
    return ReviewModel.findByIdAndUpdate(review._id, review);
}

function deleteReviewById(id) {
    return ReviewModel.deleteOne({_id: id}).exec();
}

module.exports = {
    createReview,
    getReviewById,
    getAllReviews,
    updateReview,
    deleteReviewById,
}