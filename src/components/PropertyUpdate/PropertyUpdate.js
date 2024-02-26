import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./PropertyUpdate.css";

function PropertyUpdatePage() {
  const { propertyId } = useParams();
  const [propertyData, setPropertyData] = useState({
    propertyOwnerName: "",
    location: "",
    description: "",
    numberOfRooms: "",
    propertyType: "",
    status: "",
    price: "",
    feature: {
        bathrooms: "",
        bedrooms: "",
        lounges: "",
        storeys: ""
    },
  });

  useEffect(() => {
    async function getPropertyData() {
      try {
        const response = await axios.get(`http://localhost:8080/dealers/property/${propertyId}`);
        if (response.data) {
          setPropertyData(response.data);
        } else {
          console.log(propertyData.feature);
        }
      } catch (error) {
        console.error('Error fetching property data: ', error);
      }
    }
    getPropertyData();
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/dealers/property/${propertyId}`, propertyData);
      console.log('Property updated successfully');
     
    } catch (error) {
      console.error('Error updating property:', error);
      
    }
  };

  return (
    <div className="property-update-container">
  <h2>Update Property</h2>
  <form onSubmit={handleSubmit}>
    <div className="input-wrapper">
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" defaultValue={propertyData.description} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" defaultValue={propertyData.location} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="numberOfRooms">Number of Rooms:</label>
      <input type="number" id="numberOfRooms" name="numberOfRooms" defaultValue={propertyData.numberOfRooms} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="status">Status:</label>
      <input type="text" id="status" name="status" defaultValue={propertyData.status} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" defaultValue={propertyData.price} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="propertyOwnerName">Property Owner Name:</label>
      <input type="text" id="propertyOwnerName" name="propertyOwnerName" defaultValue={propertyData.propertyOwnerName} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="propertyType">Property Type:</label>
      <input type="text" id="propertyType" name="propertyType" defaultValue={propertyData.propertyType} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="bathrooms">Bathrooms:</label>
      <input type="number" id="bathrooms" name="bathrooms" defaultValue={propertyData.feature.bathrooms} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="bedrooms">Bedrooms:</label>
      <input type="number" id="bedrooms" name="bedrooms" defaultValue={propertyData.feature.bedrooms} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="lounges">Lounges:</label>
      <input type="number" id="lounges" name="lounges" defaultValue={propertyData.feature.lounges} onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label htmlFor="storeys">Storeys:</label>
      <input type="number" id="storeys" name="storeys" defaultValue={propertyData.feature.storeys} onChange={handleChange} />
    </div>
    <button type="submit">Update Property</button>
  </form>
</div>

  );
}

export default PropertyUpdatePage;
