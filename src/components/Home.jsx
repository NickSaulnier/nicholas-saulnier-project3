import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import ReviewRow from './ReviewRow';

import '../styles/App.css'
import '../styles/Home.css'

export default function Home() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        Axios.get("/api/movieReviews/")
            .then(response => {
                console.log("Fetched all reviews");
                setReviews(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return(
        <div id="home-page-container">
            <h1 id="page-header">Movie Reviews</h1>
                {
                    reviews.length > 0 ?
                        <div id="review-list-container">
                            {
                                reviews.map((review, index) => (
                                    <ReviewRow title={review.title} 
                                        year={review.year} 
                                        user={review.username} 
                                        backgroundClass={index % 2 === 0 ? "lightgray-background" : "white-background" }
                                        key={index}
                                        id={review._id} />
                                ))
                            }
                        </div>
                    :
                        <h3 id="review-empty-header">Awaiting Reviews...</h3>
                }
        </div>
    );
}