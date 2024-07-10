import React, { useState } from 'react';
import '../styles/Recipes.css';
import recipesData from '../data/recipes.json';

const Recipes = () => {
    const [recipes] = useState(recipesData);
    const [filterType, setFilterType] = useState('');
    const [filterCuisine, setFilterCuisine] = useState('');

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFilterCuisineChange = (event) => {
        setFilterCuisine(event.target.value);
    };

    const filteredRecipes = recipes.filter(recipe => {
        if (filterType && recipe.type !== filterType) return false;
        if (filterCuisine && recipe.cuisine !== filterCuisine) return false;
        return true;
    });

    return (
        <div className="recipes-container">
            <h1>Przepisy</h1>
            <div>
                <label>
                    Typ:
                    <select onChange={handleFilterTypeChange} value={filterType}>
                        <option value="">Wszystkie</option>
                        <option value="sniadanie">Śniadanie</option>
                        <option value="obiad">Obiad</option>
                        <option value="kolacja">Kolacja</option>
                        <option value="przekaski">Przekąski</option>
                        <option value="wysokobialkowe">Wysokobiałkowe</option>
                    </select>
                </label>
                <label>
                    Kuchnia:
                    <select onChange={handleFilterCuisineChange} value={filterCuisine}>
                        <option value="">Wszystkie</option>
                        <option value="polska">Polska</option>
                        <option value="azjatycka">Azjatycka</option>
                        <option value="wloska">Włoska</option>
                        <option value="srodziemnomorska">Śródziemnomorska</option>
                    </select>
                </label>
            </div>
            <ul className="recipes-list">
                {filteredRecipes.map(recipe => (
                    <li key={recipe.id}>
                        <img src={recipe.image} alt={recipe.name} />
                        <h2>{recipe.name}</h2>
                        <p><strong>Typ:</strong> {recipe.type}</p>
                        <p><strong>Kuchnia:</strong> {recipe.cuisine}</p>
                        <p><strong>Składniki:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
                        <p><strong>Instrukcje:</strong> {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
            <footer className="footer">
                &copy; 2024 TastyRecipesHub
            </footer>
        </div>
    );
};

export default Recipes;
