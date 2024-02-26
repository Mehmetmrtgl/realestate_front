import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Property.css';
import PropertyImages from './PropertyImages';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: false,
    description: false,
    numberOfRooms: false,
    propertyType: false,
    status: false,
    price: false
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/customers/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties: ', error);
      });
  }, []);

  const handleSearch = () => {
    const filteredProperties = properties.filter(property => {
      if (!searchTerm) return true; 
      return Object.keys(filters).some(filterName => {
        if (filters[filterName]) {
          if (typeof property[filterName] === 'string') {
            return property[filterName].toLowerCase().includes(searchTerm.toLowerCase());
          } else if (typeof property[filterName] === 'number') {
            return property[filterName].toString().includes(searchTerm.toLowerCase());
          }
        }
        return false;
      });
    });

    return filteredProperties;
  };

  const handleFilterToggle = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  return (
    <div className="property-list-container">
      <div className="header">
        <h2>Properties</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <button className="toggle-filter-button" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {showFilters && (
        <div className="filter-toggle">
          <p>Filters:</p>
          {Object.keys(filters).map(filterName => (
            <label key={filterName}>
              <input
                type="checkbox"
                checked={filters[filterName]}
                onChange={() => handleFilterToggle(filterName)}
              />
              {filterName}
            </label>
          ))}
        </div>
      )}
      <ul className="property-list">
        {handleSearch().map(property => (
          <li key={property.id} className="property-item">
            <div className="property-item-2">
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
            <div className="dealer-header">
              <div className="dealer-info">
              <h3>Dealer Information</h3>
              </div>
    
      {property.client && (
                      <div>
                        <p><strong>Dealer:</strong> {property.client.firstName} {property.client.lastName}</p>
                        <p><strong>Phone Number:</strong> {property.client.mobileNumber}</p>
                      </div>
                    )}
            </div>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
