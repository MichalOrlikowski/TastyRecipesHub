import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import '../styles/Calendar.css';
import { pl } from 'date-fns/locale';
import Modal from '../components/Modal';
import recipesData from '../data/recipes.json';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [notes, setNotes] = useState(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
        return savedNotes;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [customNote, setCustomNote] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (searchTerm.length >= 3) {
            const results = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecipes(results);
            setHighlightedIndex(-1);
        } else {
            setFilteredRecipes([]);
        }
    }, [searchTerm, recipes]);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const combinedRecipes = [...recipesData, ...storedRecipes];
        setRecipes(combinedRecipes);
    }, []);

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="col col-start" onClick={prevMonth} style={{ cursor: 'pointer' }}>
                    <div className="icon">poprzedni miesiąc</div>
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat, { locale: pl })}</span>
                </div>
                <div className="col col-end" onClick={nextMonth} style={{ cursor: 'pointer' }}>
                    <div className="icon">następny miesiąc</div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = "eeee";
        const startDate = startOfWeek(currentMonth, { locale: pl });

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat, { locale: pl })}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { locale: pl });
        const endDate = endOfWeek(monthEnd, { locale: pl });

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat, { locale: pl });
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        {notes[format(day, 'yyyy-MM-dd')] && (
                            <div className="notes">
                                {notes[format(day, 'yyyy-MM-dd')].map((note, index) => (
                                    <div key={index} className="note">
                                        {note}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };

    const onDateClick = day => {
        setSelectedDate(day);
        setShowDetails(true);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleAddNote = (note) => {
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setNotes(prevNotes => {
            const newNotes = { ...prevNotes };
            if (!newNotes[dateKey]) {
                newNotes[dateKey] = [];
            }
            if (!newNotes[dateKey].includes(note)) {
                newNotes[dateKey].push(note);
            }
            return newNotes;
        });
        setSearchTerm('');
        setCustomNote('');
        setFilteredRecipes([]);
        setHighlightedIndex(-1);
    };

    const handleDeleteNote = (dateKey, index) => {
        setNotes(prevNotes => {
            const newNotes = { ...prevNotes };
            newNotes[dateKey] = newNotes[dateKey].filter((_, i) => i !== index);
            if (newNotes[dateKey].length === 0) {
                delete newNotes[dateKey];
            }
            return newNotes;
        });
    };

    const handleKeyDown = (event) => {
        if (filteredRecipes.length > 0) {
            if (event.key === 'ArrowDown') {
                setHighlightedIndex(prevIndex => (prevIndex + 1) % filteredRecipes.length);
            } else if (event.key === 'ArrowUp') {
                setHighlightedIndex(prevIndex => (prevIndex - 1 + filteredRecipes.length) % filteredRecipes.length);
            } else if (event.key === 'Enter') {
                const selectedRecipe = filteredRecipes[highlightedIndex]?.name || searchTerm;
                handleAddNote(`notes: ${selectedRecipe}`);
                setFilteredRecipes([]);
            }
        } else if (event.key === 'Enter' && customNote) {
            handleAddNote(`notatka: ${customNote}`);
        }
    };

    const handleRecipeClick = (recipe) => {
        setSearchTerm(recipe.name);
        handleAddNote(`notes: ${recipe.name}`);
        setFilteredRecipes([]);
    };

    return (
        <div className="calendar-container">
            <h1>Kalendarz</h1>
            <div className="calendar">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
            <Modal 
                show={showDetails} 
                onClose={() => setShowDetails(false)} 
                notes={notes[format(selectedDate, 'yyyy-MM-dd')]}
                selectedDate={format(selectedDate, 'yyyy-MM-dd')}
                handleDeleteNote={(index) => handleDeleteNote(format(selectedDate, 'yyyy-MM-dd'), index)}
                handleAddNote={() => handleAddNote(`notatka: ${customNote}`)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredRecipes={filteredRecipes}
                highlightedIndex={highlightedIndex}
                handleKeyDown={handleKeyDown}
                customNote={customNote}
                setCustomNote={setCustomNote}
                handleRecipeClick={handleRecipeClick}
            />
        </div>
    );
};

export default Calendar;
