import React, { useState } from 'react';
import Recipe from './Recipe';
import pan from '../assets/pan.png'

const RecipeCollection = () => {

  // function addRecipe(recipe){
  //   setElements(elements.concat(recipe))
  // }

  return (
    <div className="flex flex-wrap justify-center">
      <img className='mt-12 ml-32 w-[600px]' src={pan} alt='' />
    </div>
  );
};

export default RecipeCollection;
