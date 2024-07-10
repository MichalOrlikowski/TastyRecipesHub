import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Recipes from './Pages/Recipes';
import AddRecipe from './Pages/AddRecipe';
// import Calendar from './Pages/Calendar';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                    {/* <Route path="/calendar" element={<Calendar />} /> */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;



