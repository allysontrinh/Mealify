import React, { useState } from 'react';
import fetch from 'node-fetch';
import pantry from "../assets/pantry.jpeg"

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

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
          setIngredientList(parsedData.items);
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
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '300px' }} />}
      {imageBase64 && (
        <div>
          <div style={{ display: 'flex' }}>
            {ingredientList.map((ingredient, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }}>
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

