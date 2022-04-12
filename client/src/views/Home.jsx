import React from 'react'
import { Link } from "react-router-dom";

const HomePage = () => {
  
  return (
    <>
      <div>Welcome Home</div>
      <br />
      <Link to="/login">Login Page</Link>
      <br />
      <br />
      <Link to="/app">Dashboard Page</Link>
    </>
  )
}

export default HomePage;