import React from 'react';
import './Button.scss';

function Button (props) {
  return (
    <button className='button' onClick={ props.submitCoordinates}>Get Forecast</button>
  );
}

export default Button;
