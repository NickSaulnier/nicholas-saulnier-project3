import React, {  useState } from 'react';

import ReviewRow from './ReviewRow';

import '../styles/App.css'
import '../styles/Home.css'

export default function Home() {
    const [reviews, setReviews] = useState([
        {title: "A Serious Man - GOAT", year: 2008, user: "Sofknconfused", id: 1}, 
        {title: "Gangs of NY", year: 2002, user: "AnotherUser", id: 2},
        {title: "A Street Car Named Desire", year: 1952, user: "user202212", id: 3}
    ]);

    return(
        <div id="page-container">
            <h1 id="page-header">Movie Reviews</h1>
            <div id="review-container">
                {
                    reviews.map((review, index) => (
                        <ReviewRow title={review.title} 
                            year={review.year} 
                            user={review.user} 
                            backgroundClass={index % 2 === 0 ? "lightgray-background" : "white-background" }
                            key={index}
                            id={review.id} />
                    ))
                }
            </div>
        </div>
    );
}