// App.jsx

import { useState } from 'react';
import './App.css';
import ImageDisplay from './components/ImageDisplay';
import CharacterList from './components/CharacterList';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

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
        console.log("data", data);
        // Update UI based on response
        if (data !== null) {
          console.log("Character found")
        setSelectedCharacter("found")
        console.log(selectedCharacter)
      }
        markFoundCharacter()
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function markFoundCharacter() {
    console.log("test", selectedCharacter)
    if(selectedCharacter !== null) {
      console.log(selectedCharacter),
      setSelectedCharacter(null)
    } else {
      console.log("is null")
    }
  }

  return (
    <div>
      <h1>Where&apos;s Waldo</h1>
      <CharacterList characters={['Waldo', 'The Wizard', 'Wilma', 'Odlaw']} />
      <ImageDisplay selectedCharacter={selectedCharacter} checkCharacterLocation={checkCharacterLocation} />
    </div>
  );
}

export default App;



  // const calculateScaledCoordinates = ({ x, y }) => {
  //   const refScreenWidth = 1280;
  //   const refScreenHeight = 800;


  //   const currentScreenWidth = window.screen.availWidth;
  //   const currentScreenHeight = window.screen.availHeight;

  //   console.log(window.screen)

  //   const widthScale = currentScreenWidth / refScreenWidth;
  //   const heightScale = currentScreenHeight / refScreenHeight;

  //   const scaledX = Math.round(x * widthScale);
  //   const scaledY = Math.round(y * heightScale);

  //   return { x: scaledX, y: scaledY };
  // }