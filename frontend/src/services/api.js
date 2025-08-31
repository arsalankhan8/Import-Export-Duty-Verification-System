import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Save challan to MongoDB
  async saveChallan(challanData) {
    try {
      console.log('Making API call to save challan...');
      console.log('API URL:', `${API_BASE_URL}/challan`);
      console.log('Request data:', challanData);
      
      const response = await this.api.post('/challan', challanData);
      
      console.log('API response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);
      
      if (error.response?.status === 404) {
        throw new Error('Server not found. Please check if the backend is running.');
      } else if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to server. Please check if the backend is running on port 5000.');
      } else {
        throw new Error(error.response?.data?.message || error.message || 'Failed to save challan');
      }
    }
  }

  // Get challan by document ID from MongoDB
  async getChallanByDocumentId(documentId) {
    try {
      const response = await this.api.get(`/challan/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching challan:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch challan');
    }
  }

  // Get all challans from MongoDB
  async getAllChallans() {
    try {
      const response = await this.api.get('/challan');
      return response.data;
    } catch (error) {
      console.error('Error fetching challans:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch challans');
    }
  }

  // Update challan in MongoDB
  async updateChallan(documentId, updateData) {
    try {
      const response = await this.api.put(`/challan/${documentId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating challan:', error);
      throw new Error(error.response?.data?.message || 'Failed to update challan');
    }
  }

  // Delete challan from MongoDB
  async deleteChallan(documentId) {
    try {
      const response = await this.api.delete(`/challan/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting challan:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete challan');
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('API server is not responding');
    }
  }
}

export default new ApiService();
