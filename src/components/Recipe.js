import React, { useState } from 'react';
import notepad from '../assets/notepad.png'

const Recipe = ({text}) => {

  return (
      <div className="w-80 flex flex-wrap">
        <img className='w-80 absolute' src={notepad} alt='' />
        <div className='absolute m-16'>{text}</div>
      </div>
  );
};

export default Recipe;
