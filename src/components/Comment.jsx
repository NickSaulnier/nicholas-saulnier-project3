import React from 'react';

import '../styles/Comment.css';

const Comment = props => {
    return (
        <div className="comment">
            <div className="comment-header">
                <h5 className="comment-header-field comment-header-major">{props.comment.username}</h5>
                <h5 className="comment-header-field comment-header-minor">-</h5>
                <h5 className="comment-header-field comment-header-minor">
                    {new Date(props.comment.timestamp).toLocaleString().split(',')[0]}
                </h5>
            </div>
            <p className="comment-content">{props.comment.content}</p>
        </div>
    );
}

export default Comment;