import React from 'react';

function InputFields (props) {
  return (
    <form>
      <input
        type='text'
        value={ props.latitude }
        name='latitude'
        id='latitude'
        onChange={ props.handleInput }
        placeholder='Enter latitude'
      />
      <label htmlFor='latitude'></label>
      <input
        type='text'
        value={ props.longitude }
        name='longitude'
        id='longitude'
        onChange={ props.handleInput }
        placeholder='Enter longitude'
      />
      <label htmlFor='longitude'></label>
    </form>
  );
}

export default InputFields;
