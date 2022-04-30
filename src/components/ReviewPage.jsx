import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import Comment from './Comment';

import '../styles/ReviewPage.css';

export default function ReviewPage() {
    const [review, setReview] = useState({title: "A Serious Man - GOAT", year: 2008, director: "Coen Brothers", user: "Sofknconfused", id: 1, content: "Nevertheless, it shouldn’t be surprising that many conservatives still complain that they are being censored even as these platforms’ algorithms continue to favor right-wing content. Indeed, the success of these complaints explains their persistence—if conservatives stopped complaining, the favorable treatment might cease. Musk is a sympathetic audience, even if that does not necessarily determine the direction Twitter will take under his ownership. \n\nIt was the beginning of our current era, in which video footage serves as evidence for state violence against Black people. This era might promise validation of claims of racial injustice, but it also threatens to simply codify this injustice as an acceptable American fact. Consequences are rare and collective grief is ordinary."});
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([{user: "auser", content: "this movie is great!", timestamp: ""}, 
    {user: "fixit", content: "I was a college student 30 years ago on the night the verdict was read. A small group of friends and I called a campus rally, which we held on a plaza once distinguished for anti–Vietnam War and anti-apartheid protests. I have no memory of doing so, but apparently I led an expletive-filled chant directed at the president of the university. What I do remember is that I made a connection that night. At our freshman orientation, the dean had made a speech defending the West and its canon against the encroachment of multiculturalism. I connected that disturbing moment to the tendency of our fellow students to slam campus gates in Black students’ faces, assuming we were locals from the largely poor Black community in New Haven. I connected this juxtaposition between the rich university and the neglected Black city to King’s experience being cowed with clubs by a group of swaggering officers.", timestamp: ""}]);

    function handleAddComment() {

    }

    return (
        <div id="review-page-container">
            <div id="review-container">
                <div id="review-header">
                        <h3 className="header-field header-field-major">{"Title: " + review.title}</h3>
                        <h4 className="header-field header-field-minor">{"Year: " + review.year}</h4>
                        <h4 className="header-field header-field-minor">{"Director: " + review.director}</h4>
                </div>
                <div>
                    <p className="review-content">{review.content}</p>
                </div>
            </div>
            <div id="add-comment-container">
                <TextField multiline 
                    fullWidth 
                    label="What are your thoughts?" 
                    rows={4} 
                    value={commentInput} 
                    onChange={(event) => {setCommentInput(event.target.value)}}/>
                <button id="comment-button" 
                    onClick={handleAddComment} 
                    disabled={commentInput.length === 0}>
                        Comment
                    </button>
            </div>
            <div id="comments-container">
                <h4 id="comment-container-header">Comments</h4>
                {
                    comments.map((comment, index) => (
                        <Comment comment={comment} key={index}/>
                    ))
                }
            </div>
        </div>
    );
}