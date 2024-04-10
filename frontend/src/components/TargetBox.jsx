import PropTypes from 'prop-types';

function TargetBox({ position }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x - 25,
        top: position.y - 25,
        width: '50px',
        height: '50px',
        border: '2px solid white',
        pointerEvents: 'none', // prevent interference with click events
      }}
    />
  );
}

TargetBox.propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };
  

export default TargetBox;
