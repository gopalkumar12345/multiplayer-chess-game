import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";
const socket = io.connect("http://localhost:3000/");
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import JoiningByToken from "./components/JoiningByToken";
import NewRoom from "./components/NewRoom";
import Chessboard from "./components/Chessboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <> <Home/> <NavBar/> </> } / >
        <Route path="joinbytoken" element={<> <NavBar/> <JoiningByToken/> <Home/>  </>} /> 
        <Route path="chessboard" element={<> <NavBar/> <Chessboard/> <Home/> </>} />
      </Routes>
    </>
  );
}

export default App;
