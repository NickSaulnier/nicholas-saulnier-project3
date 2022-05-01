import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import TextField from '@mui/material/TextField';

import Comment from './Comment';

import '../styles/ReviewPage.css';

export default function ReviewPage() {
    const [review, setReview] = useState();
    const [comment, setComment] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    function handleAddComment() {
        Axios.get('/api/user/isLoggedIn')
            .then(isLoggedInResponse => {
                Axios.put('/api/movieReviews/' + review._id)
                    .then(putCommentResponse => {
                        console.log("Added comment to review " + review._id);
                        setComment("");
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log("User is not logged in"))
    }

    useEffect(() => {
        const reviewId = searchParams.get("reviewId");
        Axios.get('/api/movieReviews/' + reviewId)
            .then(response => {
                console.log("fetched review " + response.data._id);
                setReview(response.data);
            })
            .catch(error => {
                console.log("Invalid movie Id");
            })
    }, [searchParams]);

    return (
        review ?
            <div id="review-page-container">
                <div id="review-container">
                    <div id="review-header">
                            <h3 className="header-field header-field-major">{"Title: " + review.title}</h3>
                            <h4 className="header-field header-field-minor">{"Year: " + review.year}</h4>
                            <h4 className="header-field header-field-minor">{"Director: " + review.director}</h4>
                    </div>
                    <div id="content-container">
                        <p className="review-content">{review.content}</p>
                    </div>
                </div>
                <div id="add-comment-container">
                    <TextField multiline 
                        fullWidth 
                        label="What are your thoughts?" 
                        rows={4} 
                        value={comment} 
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