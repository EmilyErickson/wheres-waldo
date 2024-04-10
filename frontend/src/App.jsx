import { useState } from 'react'
import './App.css'
import ImageDisplay from './components/ImageDisplay'
import CharacterList from './components/CharacterList'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const calculateScaledCoordinates = ({ x, y }) => {
    const refScreenWidth = 1280;
    const refScreenHeight = 800;


    const currentScreenWidth = window.screen.availWidth;
    const currentScreenHeight = window.screen.availHeight;

    console.log(window.screen)

    const widthScale = currentScreenWidth / refScreenWidth;
    const heightScale = currentScreenHeight / refScreenHeight;

    const scaledX = Math.round(x * widthScale);
    const scaledY = Math.round(y * heightScale);

    return { x: scaledX, y: scaledY };
  }

  const checkCharacterLocation = (character, position) => {
    let x = position.x
    let y = position.y
    const scaledPosition = calculateScaledCoordinates({ x, y });
    console.log(x, y)
    //Send to backend
    console.log(character, "scaled", scaledPosition)

    setSelectedCharacter(null);
  };


  return (
    <div>
      <h1>Where&apos;s Waldo</h1>
      <CharacterList
        characters={['Waldo', 'The Wizard', 'Wilma', "Odlaw"]}
      />
      <ImageDisplay selectedCharacter={selectedCharacter} checkCharacterLocation={checkCharacterLocation}/>
    </div>
  );

}

export default App