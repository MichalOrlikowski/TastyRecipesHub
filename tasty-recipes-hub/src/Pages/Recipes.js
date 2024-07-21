import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css';
import recipesData from '../data/recipes.json';

const Recipes = () => {
    const [recipes, setRecipes] = useState(recipesData);
    const [filterType, setFilterType] = useState('');
    const [filterCuisine, setFilterCuisine] = useState('');
    const [useLocalStorageOnly, setUseLocalStorageOnly] = useState(false);
    const [myRecipes, setMyRecipes] = useState([]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setMyRecipes(storedRecipes);
        if (useLocalStorageOnly) {
            setRecipes(storedRecipes);
        } else {
            setRecipes([...recipesData, ...storedRecipes]);
        }
    }, [useLocalStorageOnly]);

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFilterCuisineChange = (event) => {
        setFilterCuisine(event.target.value);
    };

    const toggleRecipeSource = () => {
        setUseLocalStorageOnly(!useLocalStorageOnly);
    };

    const handleAddToMyRecipes = (recipe) => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        if (!storedRecipes.find(r => r.id === recipe.id)) {
            const updatedRecipes = [...storedRecipes, recipe];
            localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            setMyRecipes(updatedRecipes);
            setNotification('Przepis dodany do moich przepisów');
            setTimeout(() => setNotification(''), 2000);
        }
    };

    const handleRemoveFromMyRecipes = (recipeId) => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const updatedRecipes = storedRecipes.filter(r => r.id !== recipeId);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setMyRecipes(updatedRecipes);
        setRecipes(useLocalStorageOnly ? updatedRecipes : [...recipesData, ...updatedRecipes]);
        setNotification('Przepis usunięty z moich przepisów');
        setTimeout(() => setNotification(''), 2000);
    };

    const filteredRecipes = recipes.filter(recipe => {
        if (filterType && recipe.type !== filterType) return false;
        if (filterCuisine && recipe.cuisine !== filterCuisine) return false;
        return true;
    });

    return (
        <div className="recipes-container">
            <h1>Przepisy</h1>
            <div className="filters">
                <label>
                    Typ:
                    <select onChange={handleFilterTypeChange} value={filterType}>
                        <option value="">Wszystkie</option>
                        <option value="sniadanie">Śniadanie</option>
                        <option value="obiad">Obiad</option>
                        <option value="kolacja">Kolacja</option>
                        <option value="przekaski">Przekąski</option>
                        <option value="wysokobiałkowe">Wysokobiałkowe</option>
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
                        <option value="meksykańska">Meksykańska</option>
                        <option value="inne">Inne</option>
                    </select>
                </label>
                <button onClick={toggleRecipeSource}>
                    {useLocalStorageOnly ? 'Pokaż wszystkie przepisy' : 'Pokaż moje przepisy'}
                </button>
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
                        <p><strong>Kcal:</strong> {recipe.kcal}</p>
                        <p><strong>Białko:</strong> {recipe.protein}</p>
                        <p><strong>Tłuszcz:</strong> {recipe.fat}</p>
                        <p><strong>Węglowodany:</strong> {recipe.carbs}</p>
                        {!myRecipes.find(r => r.id === recipe.id) ? (
                            <button onClick={() => handleAddToMyRecipes(recipe)}>Dodaj do moich przepisów</button>
                        ) : (
                            <button onClick={() => handleRemoveFromMyRecipes(recipe.id)}>Usuń z moich przepisów</button>
                        )}
                    </li>
                ))}
            </ul>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default Recipes;
