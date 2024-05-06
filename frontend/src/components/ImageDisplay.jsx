import { useState, useRef, useEffect } from 'react';
import TargetBox from './TargetBox';
import CharactersPopup from './CharactersPopup';
import PropTypes from 'prop-types';

function ImageDisplay({foundCharacters, selectedCharacter, checkCharacterLocation, characters}) {
    const imageRef = useRef(null);
    const [targetBoxPosition, setTargetBoxPosition] = useState(null);
    const [popupSideOrientation, setPopupSideOrientation] = useState('right');
    const [popupTopOrientation, setPopupTopOrientation] = useState('top');

    useEffect(() => {
        function handleResize() {
            if (targetBoxPosition) {
                calculatePopupOrientation(targetBoxPosition);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [targetBoxPosition]);

    const calculatePopupOrientation = ({ x, y }) => {
        const imageRect = imageRef.current.getBoundingClientRect();

        // Calculate distance from the edges of the image
        const distanceFromRight = imageRect.right - x;
        const distanceFromBottom = imageRect.bottom - y;

        if (distanceFromRight < 100) {
            setPopupSideOrientation("left")
        } else {
            setPopupSideOrientation("right")
        }
        if (distanceFromBottom < 55) {
            setPopupTopOrientation("bottom")
        } else {
            setPopupTopOrientation("top")
        }
    }

    const handleImageClick = (event) => {
        const x = event.pageX;
        const y = event.pageY;
        console.log(event.view.screen)
        setTargetBoxPosition({x, y});
        calculatePopupOrientation({x, y});
    };

    const handleCharacterClick = (character, position) => {
      checkCharacterLocation(character, position)
      setTargetBoxPosition(null);
    };

    const renderCircles = () => {
      return foundCharacters.map((character, index) => (
        <div
            key={index}
            className="circle"
            style={{ left: character.xCoordinate - 18, top: character.yCoordinate - 18 }}
        />
      ));
    };


    return (
        <div>
          <img
            ref={imageRef}
            src="./src/assets/images/image3.jpeg"
            alt="Photo"
            onClick={handleImageClick}
          />
          {renderCircles()}
          {targetBoxPosition && <TargetBox position={targetBoxPosition} />}
          {targetBoxPosition && !selectedCharacter && (
            <CharactersPopup
              position={targetBoxPosition}
              sideOrientation={popupSideOrientation}
              topOrientation={popupTopOrientation}
              onSelectCharacter={handleCharacterClick}
              characters={characters}
            />
          )}
        </div>
    );
}

ImageDisplay.propTypes = {
  selectedCharacter: PropTypes.string,
  foundCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkCharacterLocation: PropTypes.func.isRequired,
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageDisplay;
