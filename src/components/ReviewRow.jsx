import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import RateReviewIcon from '@mui/icons-material/RateReview';

import '../styles/ReviewRow.css';

const ReviewForm = props => {
    let navigate = useNavigate();

    function prettyTitle() {
        const MAX_LENGTH = 30;
        const yearField = props.year ? ' (' + props.year + ')' : "";
        let title = props.title + yearField;
        title = title.length > MAX_LENGTH ? title.substring(0, MAX_LENGTH) + "..." : title;
        return title;
    }

    function handleReviewClick() {
        navigate("/ReviewPage?reviewId=" + props.id, { replace: true });
    }

    return (
        <div className={"review-row-container " + props.backgroundClass} onClick={handleReviewClick}>
            <div className="icon-container">
                <RateReviewIcon className="review-row-icon" />
            </div>
            <h2 className="review-row-title">{prettyTitle()}</h2>
            <Box sx={{ flexGrow: 1 }} />
            <h3 className="margin-right-10px username-display">{props.user}</h3>
        </div>
    );
}

export default ReviewForm;