import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import '../styles/Calendar.css';
import recipesData from '../data/recipes.json'; // Zakładając, że recipes.json jest w folderze data
import { pl } from 'date-fns/locale';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [notes, setNotes] = useState(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
            console.log("Wczytano notatki z localStorage:", savedNotes);
            return savedNotes;
        } catch (error) {
            console.error("Błąd podczas ładowania notatek z localStorage:", error);
            return {};
        }
    });
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [customNote, setCustomNote] = useState('');

    useEffect(() => {
        try {
            console.log("Zapisano notatki do localStorage:", notes);
            localStorage.setItem('notes', JSON.stringify(notes));
        } catch (error) {
            console.error("Błąd podczas zapisywania notatek do localStorage:", error);
        }
    }, [notes]);

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="col col-start" onClick={prevMonth}>
                    <div className="icon">poprzedni miesiąc</div>
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat, { locale: pl })}</span>
                </div>
                <div className="col col-end" onClick={nextMonth}>
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
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleAddNote = () => {
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const newNote = selectedRecipe ? `Przepis: ${selectedRecipe}` : customNote;
        setNotes(prevNotes => {
            const newNotes = { ...prevNotes };
            if (!newNotes[dateKey]) {
                newNotes[dateKey] = [];
            }
            newNotes[dateKey].push(newNote);
            console.log("Nowe notatki:", newNotes);
            return newNotes;
        });
        setSelectedRecipe('');
        setCustomNote('');
    };

    return (
        <div className="calendar-container">
            <h1>Kalendarz</h1>
            <div className="calendar">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
            <div className="add-recipe">
                <h2>Dodaj Przepis lub Notatkę do Kalendarza</h2>
                <select value={selectedRecipe} onChange={(e) => setSelectedRecipe(e.target.value)}>
                    <option value="">Wybierz przepis</option>
                    {recipesData.map(recipe => (
                        <option key={recipe.id} value={recipe.name}>{recipe.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Dodaj notatkę"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                />
                <button onClick={handleAddNote}>Dodaj</button>
            </div>
        </div>
    );
};

export default Calendar;
