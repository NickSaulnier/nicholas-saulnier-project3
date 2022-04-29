import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import '../styles/Register.css'

const PASSWORD_INPUT = 0;
const PASSWORD_CONFIRM_INPUT = 1;

export default function Register() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordMask, setPasswordMask] = useState("");
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");
    const [passwordConfirmationMask, setPasswordConfirmationMask] = useState("");

    function handleUsernameInput(event) {
        setUsernameInput(event.target.value);
    }

    function handlePasswordInput(event, inputType) {
        const newPasswordInput = event.target.value;
        if (inputType === PASSWORD_INPUT) {
            setPasswordMask('*'.repeat(newPasswordInput.length));
            setPasswordInput(newPasswordInput);
        } else {
            setPasswordConfirmationMask('*'.repeat(newPasswordInput.length));
            setPasswordConfirmationInput(newPasswordInput);
        }
    }

    function handleRegister() {
        console.log("register");
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
                onChange={(event) => {handlePasswordInput(event, PASSWORD_INPUT)}} />
            <TextField label="Confirm Password" 
                margin="normal" 
                value={passwordConfirmationMask} 
                onChange={(event) => {handlePasswordInput(event, PASSWORD_CONFIRM_INPUT)}} />
            <button id="register-submit-button" 
                disabled={usernameInput === "" || passwordInput === "" || passwordConfirmationInput === ""}
                onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}