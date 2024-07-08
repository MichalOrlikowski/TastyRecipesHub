import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Tasty Recipes Hub</h1>
      <p>
        Discover a world of delicious recipes at your fingertips. Whether you're looking for 
        <span className="highlight">breakfast</span> ideas, 
        <span className="highlight">lunch</span> options, 
        <span className="highlight">dinner</span> meals, or 
        <span className="highlight">snacks</span>, we've got you covered!
      </p>
      <p>
        Explore cuisines from around the globe including 
        <span className="highlight">Polish</span>, 
        <span className="highlight">Asian</span>, 
        <span className="highlight">Italian</span>, and 
        <span className="highlight">Mediterranean</span> dishes.
      </p>
    </div>
  );
};

export default Home;
