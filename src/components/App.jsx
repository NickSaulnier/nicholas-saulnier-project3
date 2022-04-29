import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home'
import Login from './Login'
import NavBar from './NavBar';
import ReviewForm from './ReviewForm';
import ReviewPage from './ReviewPage';
import Register from './Register';

import '../styles/App.css'

export default function App() {

    return (
        <div id='app-container'>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/ReviewForm' element={<ReviewForm/>} />
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/Register' element={<Register/>} />
                    <Route path='/ReviewPage' element={<ReviewPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}