import React from 'react';
import './InputFields.scss';

function InputFields (props) {
  return (
    <form>
      <input
        type='text'
        value={ props.latitude }
        name='latitude'
        id='latitude'
        onChange={ props.handleInput }
        placeholder='Enter Latitude'
      />
      <label htmlFor='latitude'></label>
      <input
        type='text'
        value={ props.longitude }
        name='longitude'
        id='longitude'
        onChange={ props.handleInput }
        placeholder='Enter Longitude'
      />
      <label htmlFor='longitude'></label>
    </form>
  );
}

export default InputFields;
