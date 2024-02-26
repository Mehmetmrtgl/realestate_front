// ApiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ApiService = {
  getAllPropertiesByDealerId: async (dealerId) => {
    const response = await axios.get(`${BASE_URL}/properties/${dealerId}`);
    return response.data;
  },

  getOnePropertyById: async (propertyId) => {
    const response = await axios.get(`${BASE_URL}/property/${propertyId}`);
    return response.data;
  },

  createOneProperty: async (propertyData) => {
    const response = await axios.post(`${BASE_URL}/property/add`, propertyData);
    return response.data;
  },

  updateOneProperty: async (propertyId, propertyData) => {
    const response = await axios.put(`${BASE_URL}/property/${propertyId}`, propertyData);
    return response.data;
  },

  deleteOneProperty: async (propertyId) => {
    await axios.delete(`${BASE_URL}/property/${propertyId}`);
  },

  addImageToProperty: async (propertyId, images) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    const response = await axios.post(`${BASE_URL}/image/add/${propertyId}`, formData);
    return response.data;
  },

  deleteImageById: async (imageId) => {
    const response = await axios.delete(`${BASE_URL}/property/image/${imageId}`);
    return response.data;
  },
};

export default ApiService;
