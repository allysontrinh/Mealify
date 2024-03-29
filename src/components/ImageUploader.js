import React, { useState } from 'react';
import fetch from 'node-fetch';
import pantry from "../assets/pantry.jpeg";
import Modal from './Modal';
import bag from '../assets/items/bag.png';
import whisk from '../assets/whisk.png'
import envelop from '../assets/envelop.png'
import remove from '../assets/remove.png'

const items_arr = ['basil', 'jalapeno', 'soysauce', 'ricenoodles', 'clove', 'butter', 'flour', 'soda', 'ginger', 'rice', 'bread', 'apple', 'tomatoes', 'watermelon', 'milk', 'pasta', 'wine', 'juice', 'avocado', 'banana', 'beef', 'egg', 'eggs', 'garlic', 'lettuce', 'meat', 'pork', 'radish', 'onion', 'carrot', 'mushroom', 'scallion', 'soy sauce', 'cilantro', 'tofu', 'cannedfood', 'beansprouts']

const ImageUploader = ({ addRecipe }) => {
  // const [imageSrc, setImageSrc] = useState('');
  // const [imageBase64, setImageBase64] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // setImageSrc(reader.result);
      convertImageToBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  function getImageData(imageBase64) {
    const url = "http://localhost:4004/getIngredients";
    const dataToSend = {
      image: imageBase64
    };
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("got the response!");
        console.log(JSON.parse(data));
        const parsedData = JSON.parse(data);
        console.log(typeof (parsedData));
        if (typeof (parsedData) == "object" && parsedData.items) {
          for (const item of parsedData.items) {
            if (!ingredientList.includes(item.toLowerCase())) {
              ingredientList.push(item.toLowerCase())
            }
          }
          setIngredientList(ingredientList);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const convertImageToBase64 = (imageSrc) => {
    // Convert image to base64
    const base64String = imageSrc.split(',')[1];
    // setImageBase64(base64String);
    // console.log(base64String);
    getImageData(base64String);
  };

  const removeIngredient = (ingredient) => {
    setIngredientList(prevList => {
      const updatedList = prevList.filter(item => item.toLowerCase().replace(/\s/g, '') !== ingredient.toLowerCase().replace(/\s/g, ''));
      return updatedList;
    });
  };

  return (
    <div>
      <div className='relative'>
        <div className='relative'>
          <img id="pantry" className='absolute' src={pantry} alt="pantry" />
          <div className='absolute mt-9 ml-8 p-2 w-[150px] rounded-md'>
            <img className='absolute' src={envelop} alt='' />
            <input className='absolute mt-20 pl-6 w-[125px] border-none' type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
        {/* <div className='absolute'>
        {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '300px' }} />}
      </div> */}
        <div className='pantry-div'>
          {
            <div className=''>
              {/* ITEMS ARE SHOWN HERE */}
              <div className='flex flex-wrap gap-6 justify-center'>
                {ingredientList.map((ingredient, index) => (
                  <div key={index} className='flex flex-wrap justify-center flex-col relative' style={{ justifyContent: 'flex-end' }}>
                    {(items_arr.includes(ingredient.toLowerCase().replace(/\s/g, ''))) ?
                      <img alt={ingredient}
                        className='h-[4.5rem] block place-self-center hover:animate-pulse'
                        src={require(`../assets/items/${ingredient.toLowerCase().replace(/\s/g, '')}.png`)}
                      />
                      : <img src={bag} alt='none'
                        className='w-16 block place-self-center'
                      />}
                    <img
                      className='absolute top-[-10px] right-[-15px] cursor-pointer w-7 hover:animate-pulse'
                      src={remove}
                      alt='remove'
                      onClick={() => removeIngredient(ingredient.toLowerCase().replace(/\s/g, ''))}
                    />
                    <p className=' text-white block place-self-center mb-10'>{ingredient.toLowerCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
      <Modal addRecipe={addRecipe} items={ingredientList} />
      <div className="loading-container" style={{ display: loading ? 'block' : 'none' }}>
        <div className="loading-spinner">
          <img src={whisk} alt='' />
        </div>
      </div>
    </div>

  );
};

export default ImageUploader;

