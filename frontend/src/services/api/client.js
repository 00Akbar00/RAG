import { BASE_URL } from '../../config/apiConfig';

class ApiClient {
  constructor() {
    this.baseURL = BASE_URL;
  }

  // Get auth headers with token
  getAuthHeaders(token) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Get auth headers for form data
  getFormAuthHeaders(token) {
    const headers = {
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Handle API response
  async handleResponse(response) {
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } else {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    }
  }

  // GET request
  async get(endpoint, token = null) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });
    
    return this.handleResponse(response);
  }

  // POST request
  async post(endpoint, data, token = null) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  // POST request with FormData
  async postForm(endpoint, formData, token = null) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getFormAuthHeaders(token),
      body: formData,
    });
    
    return this.handleResponse(response);
  }

  // PUT request
  async put(endpoint, data, token = null) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse(response);
  }

  // DELETE request
  async delete(endpoint, token = null) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    });
    
    return this.handleResponse(response);
  }
}

export default new ApiClient(); 