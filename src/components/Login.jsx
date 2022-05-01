import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

import '../styles/Login.css';

const AUTO_HIDE_DURATION = 3000;

// Source: https://mui.com/components/snackbars/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMask, setPasswordMask] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    let navigate = useNavigate();

    function handleUsernameInput(event) {
        setUsername(event.target.value);
    }

    function handlePasswordInput(event) {
        const input = event.target.value;
        const char = input[input.length-1];
        let newPassword = password;

        if (char && char !== '*') {
            // Only append a new character to the password if the input event
            // was not a backspace.
            newPassword = newPassword + char;
        } else {
            // On a backspace event, truncate the password by one character.
            newPassword = newPassword.substring(0, newPassword.length-1);
        }

        setPasswordMask('*'.repeat(newPassword.length));
        setPassword(newPassword);
    }

    function handleLoginSubmit() {
        Axios.post('/api/user/authenticate', {username, password})
            .then(response => {
                console.log("Logged in as " + response.data.username);
                navigate("/", { replace: true });
                window.location.reload(false);
            })
            .catch(error => { 
                console.log(error); 
                setSnackbarMessage("Invalid username or password");
                setSnackbarOpen(true);
            });
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
                onChange={handlePasswordInput} />
            <button id="login-submit-button" onClick={handleLoginSubmit}>Submit</button>
            <Link to="/Register">
                <button id="register-button">Register new account</button>
            </Link>
            <Snackbar open={snackbarOpen} 
                      autoHideDuration={AUTO_HIDE_DURATION} 
                      onClose={handleSnackbarClose} 
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}