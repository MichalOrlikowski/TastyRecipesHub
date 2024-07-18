import React, { useState } from 'react';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [kcal, setKcal] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newRecipe = {
            id: Date.now(),  // Add unique id for each recipe
            name,
            type,
            cuisine,
            ingredients,
            instructions,
            imageLink,
            macronutrients: {
                protein,
                fat,
                carbohydrates,
                kcal
            }
        };
        
        const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        existingRecipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(existingRecipes));
        
        // Clear the form
        setName('');
        setType('');
        setCuisine('');
        setIngredients('');
        setInstructions('');
        setImageLink('');
        setProtein('');
        setFat('');
        setCarbohydrates('');
        setKcal('');
    };

    return (
        <div className="add-recipe-container">
            <header className="add-recipe-header">
                {/* Navigation and other header content */}
            </header>
            <main className="add-recipe-main-content">
                <div className="add-recipe-form-container">
                    <h1>Dodaj Przepis</h1>
                    <form onSubmit={handleSubmit} className="add-recipe-form">
                        <div className="add-recipe-form-group">
                            <label>Nazwa:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Typ:</label>
                            <select value={type} onChange={(e) => setType(e.target.value)} required>
                                <option value="">Wybierz</option>
                                <option value="sniadanie">Śniadanie</option>
                                <option value="obiad">Obiad</option>
                                <option value="kolacja">Kolacja</option>
                                <option value="przekaski">Przekąski</option>
                                <option value="wysokobialkowe">Wysokobiałkowe</option>
                            </select>
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Kuchnia:</label>
                            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
                                <option value="">Wybierz</option>
                                <option value="polska">Polska</option>
                                <option value="azjatycka">Azjatycka</option>
                                <option value="wloska">Włoska</option>
                                <option value="srodziemnomorska">Śródziemnomorska</option>
                                <option value="meksykańska">meksykańska</option>
                                <option value="inne">Inne</option>
                            </select>
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Składniki:</label>
                            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Instrukcje:</label>
                            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Link do Zdjęcia:</label>
                            <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Białko (g):</label>
                            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Tłuszcz (g):</label>
                            <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Węglowodany (g):</label>
                            <input type="number" value={carbohydrates} onChange={(e) => setCarbohydrates(e.target.value)} />
                        </div>
                        <div className="add-recipe-form-group">
                            <label>Kalorie (kcal):</label>
                            <input type="number" value={kcal} onChange={(e) => setKcal(e.target.value)} />
                        </div>
                        <button type="submit">Dodaj Przepis</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddRecipe;
