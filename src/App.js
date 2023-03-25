import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) =>
        setMonsters(
          data.map((monster) => ({
            ...monster,
            imageUrl: `https://robohash.org/${monster.email}?set=set2`,
          }))
        )
      );
  }, []);

  function onSearchChange(event) {
    setSearch(event.target.value);
  }

  function clearSearch() {
    setSearch('');
  }

  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="title">MONSTER ROLODEX</h1>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search Monsters"
          value={search}
          onChange={onSearchChange}
        />
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div className="monster-grid">
        {filteredMonsters.map((monster) => (
          <div key={monster.id} className="monster-card">
            <img src={monster.imageUrl} alt="Monster" />
            <h2>{monster.name}</h2>
            <p>{monster.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;