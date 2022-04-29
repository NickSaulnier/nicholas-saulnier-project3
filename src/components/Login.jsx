import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import '../styles/Login.css'

export default function Login() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordMask, setPasswordMask] = useState("");

    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
    }

    function handlePasswordInput(event) {
        const newPasswordInput = event.target.value;
        setPasswordMask('*'.repeat(newPasswordInput.length));
        setPasswordInput(newPasswordInput);
    }

    function handleLoginSubmit() {

    }

    return(
        <div id="page-container">
            <TextField label="Username" 
                margin="normal" 
                value={usernameInput} 
                onChange={handleUsernameInput} />
            <TextField label="Password" 
                margin="normal" 
                value={passwordMask} 
                onChange={handlePasswordInput} />
            <button id="login-submit-button" onClick={handleLoginSubmit}>Submit</button>
            <Link to="/Register">
                <button id="register-button">Register new account</button>
            </Link>
        </div>
    );
}