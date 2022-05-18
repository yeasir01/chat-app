import React from 'react'
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <>
      <h3>Welcome to chatter!</h3>
      <br />
      <Link to="/login">Login Page</Link>
      <br />
      <br />
      <Link to="/chats">Dashboard Page</Link>
    </>
  )
}

export default HomePage;