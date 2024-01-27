import React from 'react'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import '../App.css'
import ReactDOM from 'react-dom'
import {Routes,Route} from 'react-router-dom'
import { io } from 'socket.io-client';
import { Typography } from '@mui/material';
const socket = io.connect("http://localhost:3000/")
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const[token,setToken]=useState("")
    
    useEffect(()=>{
      socket.emit("new room")
      socket.on("token",(token_id)=>{
      setToken(token_id)
        })
      socket.on("messaGE",(msg)=>{
        console.log(msg)
      })
    },[location])
    return (
    <div className='navbar'>
    <Button variant="contained" size="large" color='success' onClick= {()=>navigate("Chessboard")}>Make New Game</Button>
    <Button variant="contained" size="large" color='success'onClick={()=>navigate("joinbytoken")}>Join Game</Button>
    <Typography>{`joining code is ${token}`}</Typography>
    </div>
  )
}
export default NavBar