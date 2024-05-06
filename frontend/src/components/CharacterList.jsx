import PropTypes from 'prop-types';

function CharacterList({ characters }) {
  return (
    <div>
        <h2 className="character-list-title">Characters</h2>
      <ul className="character-list">
        {characters.map((character) => (
          <li key={character.name} className="character">
            {character.name}
            <img src={`./src/assets/images/${character.name}.jpeg`} alt={character} className="character-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

CharacterList.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  

export default CharacterList;
