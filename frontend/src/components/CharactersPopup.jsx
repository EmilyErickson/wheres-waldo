import PropTypes from 'prop-types';

function CharactersPopup({ position, sideOrientation, topOrientation, onSelectCharacter }) {
    let characters = ['Waldo', 'The Wizard', 'Wilma', 'Odlaw'];
    
    const getTop = () => {
        if (topOrientation === "top") {
            let topPositon = position.y - 25 
            return topPositon
        } else if(topOrientation === "bottom") {
            let topPositon = position.y - 245 
            return topPositon
        }
    }

    const getLeft = () => {
        if (sideOrientation === "right") {
            let leftPosition = position.x + 35 
            return leftPosition
        } else if(sideOrientation === "left") {
            let leftPosition = position.x - 95 
            return leftPosition
        }
    }


    return (
      <div
        className="character-popup"
        style={{
          position: 'absolute',
          left: getLeft(),
          top: getTop(),
        }}
      >
        <ul className="character-popup">
          {characters.map((character) => (
            <li
              key={character}
              className="character"
              onClick={() => onSelectCharacter(character, position)}
            >
              <img
                src={`./src/assets/images/${character}.jpeg`}
                alt={character}
                className="character-icon"
              />
            </li>
          ))}
        </ul>
      </div>
      );
  }
  
  CharactersPopup.propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    sideOrientation: PropTypes.oneOf(['left', 'right']).isRequired,
    topOrientation: PropTypes.oneOf(['top', 'bottom']).isRequired,
    onSelectCharacter: PropTypes.func.isRequired,
  };
  

  export default CharactersPopup;
  