import React, { useState } from 'react';
import fetch from 'node-fetch';

function getImageData(imageBase64) {
  const url = "http://localhost:4000/analyze";
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
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageBase64, setImageBase64] = useState('');

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
          <h2>Base64 Encoded Image</h2>
          {console.log(imageBase64)}
          <textarea rows="10" cols="50" value={imageBase64} readOnly />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
