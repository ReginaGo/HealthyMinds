import React, { useState } from 'react';
import "../Css/mood.css"; // Asegúrate de importar correctamente el archivo CSS

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalEntry, setJournalEntry] = useState('');

  const handleMoodChange = (e) => {
    setSelectedMood(e.target.value);
  };

  const handleSaveMood = () => {
    if (!selectedMood && !note.trim()) {
      alert('Please select a mood and/or add a note.');
      return;
    }

    alert(`Mood: ${selectedMood} saved!`);
    setSelectedMood('');
    setNote('');
  };

  const handleSaveJournalEntry = () => {
    if (!journalEntry.trim()) {
      alert('Please add some text for your journal entry.');
      return;
    }

    setJournalEntries([...journalEntries, journalEntry]);
    setJournalEntry('');
  };

  return (
    <>
    <button
        className="back-button"
        onClick={() => window.history.back()}
        style={{
          width: '40px',
          height: '40px',
          position: 'absolute',
          top: '70px',
          left: '20px',
          zIndex: 1000,
         
        }}
      >
        <img style={{width: '20px'}} src="./img/arrow-back.png" alt="Go back" />
      </button>

    <div className="mood-tracker-container">
    
      <h1>Mood Tracker</h1>
      <div className="mood-select">
        <label className="mood" data-mood="happy" htmlFor="mood-happy">
          😊
          <input
            type="radio"
            id="mood-happy"
            name="mood"
            value="happy"
            checked={selectedMood === 'happy'}
            onChange={handleMoodChange}
          />
        </label>
        <label className="mood" data-mood="neutral" htmlFor="mood-neutral">
          😐
          <input
            type="radio"
            id="mood-neutral"
            name="mood"
            value="neutral"
            checked={selectedMood === 'neutral'}
            onChange={handleMoodChange}
          />
        </label>
        <label className="mood" data-mood="sad" htmlFor="mood-sad">
          😢
          <input
            type="radio"
            id="mood-sad"
            name="mood"
            value="sad"
            checked={selectedMood === 'sad'}
            onChange={handleMoodChange}
          />
        </label>
        <label className="mood" data-mood="angry" htmlFor="mood-angry">
          😠
          <input
            type="radio"
            id="mood-angry"
            name="mood"
            value="angry"
            checked={selectedMood === 'angry'}
            onChange={handleMoodChange}
          />
        </label>
      </div>

      <textarea
        className="mood-tracker-textarea"
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button className="mood-tracker-button" onClick={handleSaveMood}>
        Save
      </button>

      <div className="journal-section">
        <h2 className="mood-tracker-journal-header">Journal</h2>
        <div className="journal-entry">
          <textarea
            className="mood-tracker-journal-entry-textarea"
            placeholder="Write your goals for today..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          ></textarea>
          <button className="mood-tracker-button" onClick={handleSaveJournalEntry}>
            Save Entry
          </button>
        </div>
        <ul className="mood-tracker-entries-list">
          {journalEntries.map((entry, index) => (
            <li key={index} className="mood-tracker-entries-list-item">
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default MoodTracker;
