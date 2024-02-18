import React, { useState } from 'react';
import signupbox from '../assets/signupbox.png'

const Signup = () => {
  const [elements, setElements] = useState(['Element 1']);

  // function addRecipe(recipe){
  //   setElements(elements.concat(recipe))
  // }

  return (
    <div className="flex flex-wrap justify-center">
      <img className='mt-24 ml-2 w-[600px]' src={signupbox} alt='' />
    </div>
  );
};

export default Signup;
