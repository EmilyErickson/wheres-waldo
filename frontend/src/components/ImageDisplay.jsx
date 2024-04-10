import { useState, useRef, useEffect } from 'react';
import TargetBox from './TargetBox';
import CharactersPopup from './CharactersPopup';
import PropTypes from 'prop-types';

function ImageDisplay({selectedCharacter, checkCharacterLocation}) {
    const imageRef = useRef(null);
    const [targetBoxPosition, setTargetBoxPosition] = useState(null);
    // const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [popupSideOrientation, setPopupSideOrientation] = useState('right'); // Default orientation
    const [popupTopOrientation, setPopupTopOrientation] = useState('top'); // Default orientation

    useEffect(() => {
        function handleResize() {
            // Recalculate popup position on window resize
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

        setTargetBoxPosition({x, y});
        calculatePopupOrientation({x, y});
    };

    const handleCharacterClick = (character, position) => {
      console.log("position", position)

      checkCharacterLocation(character, position)
      setTargetBoxPosition(null);
    };

    return (
        <div>
            <img
                ref={imageRef}
                src="./src/assets/images/image3.jpeg"
                alt="Photo"
                onClick={handleImageClick}
            />
            {targetBoxPosition && <TargetBox position={targetBoxPosition} />}
            {targetBoxPosition && !selectedCharacter && (
                <CharactersPopup
                    position={targetBoxPosition}
                    sideOrientation={popupSideOrientation}
                    topOrientation={popupTopOrientation}
                    onSelectCharacter={handleCharacterClick}
                />
            )}
        </div>
    );
}

ImageDisplay.propTypes = {
  selectedCharacter: PropTypes.string,
  checkCharacterLocation: PropTypes.func.isRequired
};

export default ImageDisplay;
