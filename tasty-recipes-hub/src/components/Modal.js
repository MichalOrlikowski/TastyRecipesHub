import React from 'react';
import '../styles/Modal.css';

const Modal = ({ show, onClose, notes, selectedDate, handleDeleteNote, handleAddNote, searchTerm, setSearchTerm, filteredRecipes, highlightedIndex, handleKeyDown, customNote, setCustomNote, handleRecipeClick }) => {
    if (!show) {
        return null;
    }

    const handleCloseModal = (e) => {
        if (e.target.className === 'details-modal') {
            onClose();
        }
    };

    return (
        <div className="details-modal" onClick={handleCloseModal}>
            <div className="details-content">
                <h2>Notatki na dzień {selectedDate}</h2>
                <ul>
                    {notes && notes.map((note, index) => (
                        <li key={index}>
                            <span className="note-text">{note}</span>
                            <button onClick={() => handleDeleteNote(index)}>Usuń</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Wyszukaj przepis"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="recipe-list-container">
                    {filteredRecipes.length > 0 && (
                        <ul className="recipe-list">
                            {filteredRecipes.map((recipe, index) => (
                                <li key={recipe.id}
                                    onClick={() => handleRecipeClick(recipe)}
                                    className={highlightedIndex === index ? 'highlighted' : ''}
                                >
                                    {recipe.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Dodaj notatkę"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="button-group">
                    <button onClick={handleAddNote}>Dodaj</button>
                    <button onClick={onClose}>Zamknij</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
