import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyImages = ({ propertyId }) => {
  const [imageDataList, setImageDataList] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/dealers/property/images/${propertyId}`, {
          responseType: 'arraybuffer' 
        });
  
        
        const blob = new Blob([response.data], { type: 'image/jpeg' }); 
  
       
        const imageUrl = URL.createObjectURL(blob);
  
        
        setImageDataList([imageUrl]);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, [propertyId]);
  
  return (
    <div>
      {imageDataList.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Property Image ${index}`}
          style={{ maxWidth: '20%', height: 'auto', marginBottom: '10px' }}
        />
      ))}
    </div>
  );
};

export default PropertyImages;
