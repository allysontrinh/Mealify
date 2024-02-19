import React, { useState } from 'react';
import collectionpage from "../assets/collectionpage.jpg"

const ItemCollection = () => {

  return (
    <div className="flex flex-wrap justify-center">
        <img className='w-[90%]' src={collectionpage} alt=''/>
    </div>
  );
};

export default ItemCollection;
