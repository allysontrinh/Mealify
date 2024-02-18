import React, { useState } from 'react';
import fetch from 'node-fetch';
import pantry from "../assets/pantry.jpeg";
import Modal from './Modal';
import bag from '../assets/items/bag.png';

const items_arr = ['rice','bread','apple','tomatoes','watermelon','milk','pasta','wine','juice','avocado', 'banana', 'beef', 'egg', 'eggs', 'garlic', 'lettuce', 'meat', 'pork', 'radish', 'onion', 'carrot', 'mushroom', 'scallion', 'soy sauce', 'cilantro', 'tofu']

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
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
          console.log("checked!");
          const mergedArray = ingredientList.concat(parsedData.items);

          const resultArray = mergedArray.filter((item, index) => {
            return mergedArray.indexOf(item) === index;
          });
          setIngredientList(resultArray);
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
    setImageBase64(base64String);
    // console.log(base64String);
    getImageData(base64String);
  };

  return (
    <div>
      <div className='relative'>
        <img id="pantry" className='absolute' src={pantry} alt="pantry" />
        <div className='absolute mt-9 ml-8 bg-[#faf6de] p-2 w-[250px] rounded-md'>
          <input className='' type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* <div className='absolute'>
        {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '300px' }} />}
      </div> */}
        <div className='absolute centered-div'>
          {imageBase64 && (
            <div className=''>
              {/* Show ITEMS HERE */}
              <div className='flex flex-wrap gap-2 '>
                {ingredientList.map((ingredient, index) => (
                  <div key={index} className='flex flex-end w-[90px] flex-wrap justify-center' style={{ margin: '5px' }}>
                    {(items_arr.includes(ingredient.toLowerCase())) ? <img className='w-16' src={require(`../assets/items/${ingredient.toLowerCase()}.png`)} alt={ingredient} /> : <img className='w-16' src={bag} alt='none' />}
                    <div className='place-self-end'>{ingredient.toLowerCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal items={ingredientList} />
      <div className="loading-container" style={{ display: loading ? 'block' : 'none' }}>
        <div className="loading-spinner"></div>
      </div>
    </div>

  );
};

export default ImageUploader;

