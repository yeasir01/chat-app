import React from 'react'
import { Link } from "react-router-dom";
import io from 'socket.io-client';

const origin = window.location.origin;
const socket = io(origin); 

const HomePage = () => {

  React.useEffect(()=>{
    socket.on('connect', () => {
      console.log("now connected")
    });

    return () => socket.off('connect')
  },[])

  React.useEffect(()=>{
    socket.on('new-user', (msg) => {
      console.log(msg)
    });

    return () => socket.off('new-user')
  },[])

  return (
    <>
      <div>Welcome Home</div>
      <br />
      <Link to="/login">Login Page</Link>
      <br />
      <br />
      <Link to="/dashboard">Dashboard Page</Link>
    </>
  )
}

export default HomePage;