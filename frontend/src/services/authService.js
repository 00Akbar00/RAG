import authApi from './api/auth/authApi';

class AuthService {
  // User registration
  async signup(username, email, password, confirmPassword) {
    try {
      const response = await authApi.signup(username, email, password, confirmPassword);
      return {
        success: true,
        data: response,
        message: 'Account created successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create account'
      };
    }
  }

  // User login
  async login(email, password) {
    try {
      const response = await authApi.login(email, password);
      
      // Store token in localStorage
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response,
        message: 'Login successful!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Login failed'
      };
    }
  }

  // User logout
  async logout(token) {
    try {
      await authApi.logout(token);
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return {
        success: true,
        message: 'Logout successful!'
      };
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return {
        success: true,
        message: 'Logout successful!'
      };
    }
  }

  // Get current user profile
  async getProfile(token) {
    try {
      const response = await authApi.getProfile(token);
      return {
        success: true,
        data: response,
        message: 'Profile retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve profile'
      };
    }
  }

  // Update user profile
  async updateProfile(userData, token) {
    try {
      const response = await authApi.updateProfile(userData, token);
      
      // Update stored user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        data: response,
        message: 'Profile updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update profile'
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  }

  // Get stored user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Refresh token
  async refreshToken(refreshToken) {
    try {
      const response = await authApi.refreshToken(refreshToken);
      
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return {
        success: true,
        data: response,
        message: 'Token refreshed successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to refresh token'
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authApi.forgotPassword(email);
      return {
        success: true,
        data: response,
        message: 'Password reset email sent!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to send reset email'
      };
    }
  }

  // Reset password
  async resetPassword(token, email, password, passwordConfirmation) {
    try {
      const response = await authApi.resetPassword(token, email, password, passwordConfirmation);
      return {
        success: true,
        data: response,
        message: 'Password reset successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to reset password'
      };
    }
  }
}

export default new AuthService(); 