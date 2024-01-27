import React from 'react'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000/")
const JoiningByToken = () => {
  const navigate=useNavigate()
    function joinRoom(){
        socket.emit("join room",input)
        socket.on("messaGE",(msg)=>{
            console.log(msg)
        })
        navigate("Chessboard")
    }
    const[input,setInput]=useState("")


  return (
    <div className='tokenfield'>
         <TextField  id="filled"  label="enter code" variant="filled" onChange={(event) => {
          setInput(event.target.value);
        }} />
         <Button variant="contained" size="small" color='error' onClick={joinRoom}>submit</Button>
         
    </div>
  )
}

export default JoiningByToken