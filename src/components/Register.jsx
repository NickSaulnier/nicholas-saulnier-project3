import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import '../styles/Register.css'

const AUTO_HIDE_DURATION = 3000;

const PASSWORD_INPUT = 0;
const PASSWORD_CONFIRM_INPUT = 1;

// Source: https://mui.com/components/snackbars/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMask, setPasswordMask] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordConfirmationMask, setPasswordConfirmationMask] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    let navigate = useNavigate();

    function handleUsernameInput(event) {
        setUsername(event.target.value);
    }

    // Form the password string from the input and resize the password mask.
    function handlePasswordInput(event, inputType) {
        const input = event.target.value;
        const char = input[input.length-1];
        let newPassword = inputType === PASSWORD_INPUT ? password : passwordConfirmation;

        if (char && char !== '*') {
            // Only append a new character to the password if the input event
            // was not a backspace.
            newPassword = newPassword + char;
        } else {
            // On a backspace event, truncate the password by one character.
            newPassword = newPassword.substring(0, newPassword.length-1);
        }

        if (inputType === PASSWORD_INPUT) {
            setPasswordMask('*'.repeat(input.length));
            setPassword(newPassword);
        } else {
            setPasswordConfirmationMask('*'.repeat(input.length));
            setPasswordConfirmation(newPassword);
        }
    }

    function handleRegister() {
        if (password !== passwordConfirmation) {
            setSnackbarMessage("Error: passwords do not match.");
            setSnackbarOpen(true);
        } else {
            Axios.post('/api/user', {username, password})
            .then(response => {
                console.log("Created user " + response.data.username);
                navigate("/", { replace: true });
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error);
                setSnackbarMessage("Error: account could not be created.");
                setSnackbarOpen(true);
            });
        }
    }

    function handleSnackbarClose() {
        setSnackbarOpen(false);
    }

    return(
        <div id="page-container">
            <TextField label="Username" 
                margin="normal" 
                value={username} 
                onChange={handleUsernameInput} />
            <TextField label="Password" 
                margin="normal" 
                value={passwordMask} 
                onChange={(event) => {handlePasswordInput(event, PASSWORD_INPUT)}} />
            <TextField label="Confirm Password" 
                margin="normal" 
                value={passwordConfirmationMask} 
                onChange={(event) => {handlePasswordInput(event, PASSWORD_CONFIRM_INPUT)}} />
            <button id="register-submit-button" 
                disabled={username === "" || password === "" || passwordConfirmation === ""}
                onClick={handleRegister}>
                Register
            </button>
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