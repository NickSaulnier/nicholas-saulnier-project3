import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import Comment from './Comment';

import '../styles/ReviewPage.css';

export default function ReviewPage() {
    const [review, setReview] = useState();
    const [editedReviewContent, setEditedReviewContent] = useState();
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState();
    const [editReviewMode, setEditReviewMode] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    function fetchAndSetReview(reviewId) {
        Axios.get('/api/movieReviews/' + reviewId)
            .then(response => {
                if (response.data._id) {
                    console.log("fetched review " + response.data._id);
                    setReview(response.data);
                } else {
                    // Review doesn't exist, route to home.
                    navigate("/", { replace: true });
                    window.location.reload(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function addComment(commentObj) {
        review.comments.push(commentObj);
        Axios.put('/api/movieReviews/', {review: review})
            .then(response => {
                console.log("Added comment to review " + review._id);
                fetchAndSetReview(review._id);
                setComment("");
            })
            .catch(error => console.log(error))
    }

    function handleAddComment() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => {
                const username = response.data.username;
                const commentObj = {
                    content: comment,
                    username: username,
                    timestamp: Date.now(),
                };
                addComment(commentObj);
            })
            .catch(error => console.log("User is not logged in"))
    }

    function turnOnEditMode() {
        if (editReviewMode) {
            setEditReviewMode(false);
            setEditedReviewContent();
        } else {
            setEditReviewMode(true);
            setEditedReviewContent(review.content);
        }
    }

    function deleteReview() {
        Axios.delete('api/movieReviews/' + review._id)
            .then(response => {
                console.log("Review deleted");
                navigate("/", { replace: true });
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function updateReview() {
        review.content = editedReviewContent;
        Axios.put('/api/movieReviews/', {review: review})
            .then(response => {
                console.log("Edited review");
                fetchAndSetReview(review._id);
                setComment("");
                setEditReviewMode(false);
                setEditedReviewContent();
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        Axios.get('/api/user/isLoggedIn')
            .then(response => {
                setUsername(response.data.username);
            })
            .catch(error => {
                console.log(error);
            })
        const reviewId = searchParams.get("reviewId");
        fetchAndSetReview(reviewId);
    }, [searchParams]);

    return (
        review ?
            <div id="review-page-container">
                <div id="review-container">
                    <div id="review-header">
                        <div id="review-header-title-row">
                            <h3 className="header-field header-field-major">{"Title: " + review.title}</h3>
                            <Box sx={{ flexGrow: 1 }} />
                            <h5 className="header-field header-field-tertiary">
                                {
                                    review.username + ' - ' + new Date(review.timestamp).toLocaleString().split(',')[0]
                                }
                            </h5>
                        </div>
                        <h4 className="header-field header-field-minor">
                            {review.year ? "Year: " + review.year : "Year: "}
                        </h4>
                        <h4 className="header-field header-field-minor">
                            {"Director: " + review.director}
                        </h4>
                    </div>
                    <div id="content-container">
                        {
                            username === review.username ? 
                                <div id="content-container-header">
                                    <Tooltip title="Edit" placement="bottom-end">
                                        <IconButton onClick={turnOnEditMode}>
                                            <CreateIcon className="content-container-header-button" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="bottom-end">
                                        <IconButton onClick={deleteReview}>
                                            <DeleteForeverIcon className="content-container-header-button" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            :
                                <div></div>
                        }
                        {
                            editReviewMode ?
                                <div id="content-edit-container">
                                    <TextField multiline 
                                        fullWidth
                                        rows={4} 
                                        value={editedReviewContent} 
                                        onChange={(event) => {setEditedReviewContent(event.target.value)}}/>
                                    <div id="content-container-footer">
                                        <button id="content-container-footer-button" onClick={updateReview}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            :
                                <p className="review-content">{review.content}</p>
                        }
                    </div>
                </div>
                <div id="add-comment-container">
                    <TextField multiline 
                        fullWidth 
                        label="What are your thoughts?" 
                        rows={4} 
                        value={comment} 
                        disabled={!username}
                        onChange={(event) => {setComment(event.target.value)}}/>
                    <button id="comment-button" 
                        onClick={handleAddComment} 
                        disabled={comment.length === 0}>
                            Comment
                        </button>
                </div>
                <div id="comments-container">
                    <h4 id="comment-container-header">Comments</h4>
                    {
                        review.comments.map((comment, index) => (
                            <Comment comment={comment} key={index}/>
                        ))
                    }
                </div>
            </div>
        :
            <div></div>
    );
}