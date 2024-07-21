import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/add-recipe">Add Recipe</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/details">Details</Link>
    </nav>
  );
};

export default NavBar;
