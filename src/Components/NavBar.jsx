import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://imgs.search.brave.com/6SmqMH7CrZFBD6jWHNdO0YDQWfddOFttbqukE4-PCSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5nbG9nby5jb20v/aW1hZ2VzLzE3MDE1/MjcxMDRia2FzaC1s/b2dvLXBuZy5wbmc"
          alt="Logo"
          className="logo"
        />
        <span className="app-name">CareerPath</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">SignUp</Link>
      </div>
    </nav>
  );
}

export default Navbar;
