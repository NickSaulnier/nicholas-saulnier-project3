import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import '../styles/ReviewForm.css';

const AUTO_HIDE_DURATION = 3000;

// Source: https://mui.com/components/snackbars/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ReviewForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [year, setYear] = useState();
    const [director, setDirector] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    let navigate = useNavigate();

    const handleSubmit = () => {
        Axios.get('/api/user/isLoggedIn')
            .then(loggedInResponse => {
                const username = loggedInResponse.data.username;
                if (!title) {
                    setSnackbarMessage("Error: reviews need a title!");
                    setSnackbarOpen(true);
                }
                else if (!content) {
                    setSnackbarMessage("Error: reviews need a review!");
                    setSnackbarOpen(true);
                } else {
                    const review = {
                        title: title,
                        content: content,
                        year: year,
                        director: director,
                        username: username,
                        timestamp: Date.now(),
                        comments: [],
                    };

                    Axios.post('/api/movieReviews/', review)
                        .then(postReviewResponse => {
                            console.log("Created review");
                            navigate("/ReviewPage?reviewId=" + postReviewResponse.data._id, { replace: true });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => console.log(error))
    };

    function handleSnackbarClose() {
        setSnackbarOpen(false);
    }

    return(
        <div id="page-container">
            <div id="form-container">
                <TextField fullWidth 
                    label="Movie Title" 
                    margin="normal" 
                    value={title} 
                    onChange={(event) => {setTitle(event.target.value)}}/>
                <TextField multiline 
                    fullWidth 
                    label="Write review here..." 
                    rows={16} 
                    value={content} 
                    onChange={(event) => {setContent(event.target.value)}}/>
                <div id="attributes-container">
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField type="number" 
                            style={{ marginRight: "8px" }} 
                            label="Release Year" 
                            margin="normal" 
                            value={year} 
                            onChange={(event) => {setYear(event.target.value)}}/>
                        <TextField style={{ marginRight: "10px" }} 
                            label="Director" 
                            margin="normal" 
                            value={director} 
                            onChange={(event) => {setDirector(event.target.value)}}/>
                    </Box>
                    <button id="submit-button" 
                        onClick={handleSubmit} 
                        disabled={!title || !content}>
                            Submit
                    </button>
                </div>
            </div>
            <Snackbar open={snackbarOpen} 
                      autoHideDuration={AUTO_HIDE_DURATION} 
                      onClose={handleSnackbarClose} 
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}