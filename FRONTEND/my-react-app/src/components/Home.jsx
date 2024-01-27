import React from 'react'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import '../App.css'
import ReactDOM from 'react-dom'
import {Routes,Route} from 'react-router-dom'
import { io } from 'socket.io-client';
import { Typography } from '@mui/material';
const socket = io.connect("http://localhost:3000/")
// import {Home} from './components/Home'
// import {NavBar} from './components/NavBar'
// import {joiningByToken} from './components/JoiningByToken'
// import {NewRoom} from './components/NewRoom'
const Home = () => {
    return(
    <div className='main'>

    </div>
    )

};
export default Home