import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./Dealer.css";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PropertyImages from '../Property/PropertyImages';

function Dealer() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    numberOfRooms: '',
    status: '',
    price: '',
    propertyOwnerName: '',
    propertyType: '',
    bathrooms: '',
    bedrooms: '',
    lounges: '',
    storeys: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [formWarning, setFormWarning] = useState('');

  const handleImageChange = (event) => {
    setSelectedImages([...selectedImages, ...event.target.files]);
  };

  const handlePropertySubmit = async (event) => {
    event.preventDefault();
    const requestData = { ...formData, clientId: location.state.id };
    for (const key in formData) {
      if (formData[key] === '') {
        setFormWarning('All fields are required');
        return;
      }
    }
    try {
      const response = await axios.post('http://localhost:8080/dealers/property/add', requestData);
      console.log('Property added successfully:', response.data);
      
      console.log(response.data.id)
      handleImageSubmit(event, response.data.id);
      
      setFormWarning('');
      
      setFormData({
        description: '',
        location: '',
        numberOfRooms: '',
        status: '',
        price: '',
        propertyOwnerName: '',
        propertyType: '',
        bathrooms: '',
        bedrooms: '',
        lounges: '',
        storeys: ''
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleImageSubmit = async (event, propertyId) => {
    event.preventDefault();
    try {
      
      const formDataForImages = new FormData();
      selectedImages.forEach((image) => {
        formDataForImages.append('images', image);
      });
      await axios.post(`http://localhost:8080/dealers/image/add/${propertyId}`, formDataForImages);
      
      
      setSelectedImages([]);
      
      loadProperties();
      
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value; 
  
    if (name === "numberOfRooms" || name === "price" || name === "bathrooms" || name === "bedrooms" || name === "lounges" || name === "storeys") {
      newValue = Math.max(parseInt(value), 0);
    }
  
    setFormData({ ...formData, [name]: newValue });
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/dealers/properties/${location.state.id}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties: ', error);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.propertyOwnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:8080/dealers/property/${propertyId}`);
     
      setProperties(properties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
  
  return (
    <div className="dealer-container-main">
      <div className="dealer-container">
        <div className="header">
          <h2>Property Adding</h2>
        </div>

        <form className="form-dealer">
          {formWarning && <p className="form-warning">{formWarning}</p>}
          <div className="input-group">
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="location" placeholder="Adresses" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="property-details">
            <input type="number" name="numberOfRooms" placeholder="Number of Rooms" value={formData.numberOfRooms} onChange={handleChange} required />
            <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required min="0" />
          </div>

          <div className="property-owner-type">
            <input type="text" name="propertyOwnerName" placeholder="Property Owner Name" value={formData.propertyOwnerName} onChange={handleChange} required />
            <input type="text" name="propertyType" placeholder="Property Type" value={formData.propertyType} onChange={handleChange} required />
          </div>

          <h2>Property Features</h2>
          <div className="property-features">
            <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required min="0" />
            <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required min="0" />
            <input type="number" name="lounges" placeholder="Lounges" value={formData.lounges} onChange={handleChange} required min="0" />
            <input type="number" name="storeys" placeholder="Storeys" value={formData.storeys} onChange={handleChange} required min="0" />
          </div>

          
        </form>

        <div className="image-container">
          <div className= "image-header">
            <h2>Adding Image</h2>
          </div>
          <form className="form-container" onSubmit={handlePropertySubmit}>
            <input type="file" name="images" onChange={handleImageChange} multiple />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
      <div className="property-list-container">
        <ul className="property-list">
          {filteredProperties.map(property => (
            <li key={property.id} className="property-item">
              <button onClick={() => handleDeleteProperty(property.id)} className="delete-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <Link to={`/dealer/property-update/${property.id}`} className="update-button">
                Update
              </Link>
              <div className="property-item2">
              <h3>{property.propertyOwnerName}'s Property</h3>
              <p><strong>Adresses:</strong> {property.location}</p>
              <p><strong>Description:</strong> {property.description}</p>
              <p><strong>Number of Rooms:</strong> {property.numberOfRooms}</p>
              <p><strong>Property Type:</strong> {property.propertyType}</p>
              <p><strong>Status:</strong> {property.status}</p>
              <p><strong>Price:</strong> {property.price}</p>
              <ul className="property-features">
                <li><strong>Bathrooms:</strong> {property.feature.bathrooms}</li>
                <li><strong>Bedrooms:</strong> {property.feature.bedrooms}</li>
                <li><strong>Lounges:</strong> {property.feature.lounges}</li>
                <li><strong>Storeys:</strong> {property.feature.storeys}</li>
              </ul>
              </div>
              <div className="Image-container">
                <PropertyImages propertyId={property.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dealer;
