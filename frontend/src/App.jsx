import { useState } from 'react';
import './App.css';
import ImageDisplay from './components/ImageDisplay';
import CharacterList from './components/CharacterList';

function App() {
  const [foundCharacters, setFoundCharacters] = useState([]);

  const checkCharacterLocation = (character, position) => {
    // Make API request to backend
    console.log("position", position)
    fetch('http://localhost:3001/checkCharacterLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ character, position }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from backend
        console.log("data", data.characterFound);
        // Update UI based on response
        if (data.characterFound !== null) {
          console.log("Character found")
          markFoundCharacter(data.characterFound)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function markFoundCharacter(character) {
    setFoundCharacters([...foundCharacters, character]);
  }

  const characters = [{
    name: "Waldo",
    isFound: false,
    xCoordinate: 385,
    yCoordinate: 610
  }, {
    name: "The Wizard",
    isFound: false,
    xCoordinate: 740,
    yCoordinate: 575
  }, {
    name: "Wilma",
    isFound: false,
    xCoordinate: 280,
    yCoordinate: 540
  }, {
    name: "Odlaw",
    isFound: true,
    xCoordinate: 70,
    yCoordinate: 650
  }];

  return (
    <div>
      <h1>Where&apos;s Waldo</h1>
      <CharacterList characters={characters} />
      <ImageDisplay foundCharacters={foundCharacters} checkCharacterLocation={checkCharacterLocation} characters={characters} />
    </div>
  );
}

export default App;
