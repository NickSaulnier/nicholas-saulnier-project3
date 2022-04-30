import React, { useState } from 'react';
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
    const [titleInput, setTitleInput] = useState("");
    const [reviewInput, setReviewInput] = useState("");
    const [yearInput, setYearInput] = useState();
    const [directorInput, setDirectorInput] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSubmit = () => {
        if (!titleInput) {
            setSnackbarMessage("Error: reviews need a title!");
            setSnackbarOpen(true);
        }
        else if (!reviewInput) {
            setSnackbarMessage("Error: reviews need a review!");
            setSnackbarOpen(true);
        } else {
            // put request logic
        }
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
                    value={titleInput} 
                    onChange={(event) => {setTitleInput(event.target.value)}}/>
                <TextField multiline 
                    fullWidth 
                    label="Write review here..." 
                    rows={16} 
                    value={reviewInput} 
                    onChange={(event) => {setReviewInput(event.target.value)}}/>
                <div id="attributes-container">
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField type="number" 
                            style={{ marginRight: "8px" }} 
                            label="Release Year" 
                            margin="normal" 
                            value={yearInput} 
                            onChange={(event) => {setYearInput(event.target.value)}}/>
                        <TextField style={{ marginRight: "10px" }} 
                            label="Director" 
                            margin="normal" 
                            value={directorInput} 
                            onChange={(event) => {setDirectorInput(event.target.value)}}/>
                    </Box>
                    <button id="submit-button" onClick={handleSubmit}>Submit</button>
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