import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home'
import Login from './Login'
import NavBar from './NavBar';
import ReviewForm from './ReviewForm';

import '../styles/App.css'

export default function App() {

    return (
        <div id='app-container'>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/ReviewForm' element={<ReviewForm/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}