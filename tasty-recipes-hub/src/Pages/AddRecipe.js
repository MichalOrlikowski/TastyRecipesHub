import React, { useState } from 'react';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageLink, setImageLink] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add recipe to the database or state
    };

    return (
        <div className="container">
            <header className="header">
                {/* Navigation and other header content */}
            </header>
            <main className="main-content">
                <div className="add-recipe-container">
                    <h1>Dodaj Przepis</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nazwa:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Typ:</label>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Wybierz</option>
                                <option value="sniadanie">Śniadanie</option>
                                <option value="obiad">Obiad</option>
                                <option value="kolacja">Kolacja</option>
                                <option value="przekaski">Przekąski</option>
                                <option value="wysokobialkowe">Wysokobiałkowe</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Kuchnia:</label>
                            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                <option value="">Wybierz</option>
                                <option value="polska">Polska</option>
                                <option value="azjatycka">Azjatycka</option>
                                <option value="wloska">Włoska</option>
                                <option value="srodziemnomorska">Śródziemnomorska</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Składniki:</label>
                            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Instrukcje:</label>
                            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Link do Zdjęcia:</label>
                            <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                        </div>
                        <button type="submit">Dodaj Przepis</button>
                    </form>
                </div>
            </main>
            <footer className="footer">
                © 2024 TastyRecipesHub
            </footer>
        </div>
    );
};

export default AddRecipe;
