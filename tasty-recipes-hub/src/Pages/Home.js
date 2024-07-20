import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [todayRecipes, setTodayRecipes] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('notes')) || {};
        const todayDate = new Date().toISOString().split('T')[0];
        const todayData = storedData[todayDate] || [];

        const todayNotes = todayData.filter(item => item.startsWith('notatka: '));
        const todayRecipesList = todayData.filter(item => item.startsWith('notes: '));

        setNotes(todayNotes.map(note => note.replace('notatka: ', '')));
        setTodayRecipes(todayRecipesList.map(recipe => recipe.replace('notes: ', '')));
    }, []);

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to Tasty Recipes Hub</h1>
                <p>
                    Discover the best recipes from around the world. Whether you're looking for breakfast, lunch, dinner, snacks, or high-protein meals, we've got you covered. Explore different cuisines and enjoy cooking with us!
                </p>
            </div>
            <div className="home-extra">
                <div className="home-notes">
                    <h2>Notes</h2>
                    <ul>
                        {notes.length > 0 ? notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        )) : <li>No notes for today.</li>}
                    </ul>
                </div>
                <div className="home-recipes">
                    <h2>Today's Recipes</h2>
                    <ul>
                        {todayRecipes.length > 0 ? todayRecipes.map((recipe, index) => (
                            <li key={index}>{recipe}</li>
                        )) : <li>No recipes for today.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
