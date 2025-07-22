import apiClient from '../client';

class AuthApi {
  // User registration
  async signup(username, email, password, confirmPassword) {
    return apiClient.post('register', {
      user_name: username,
      email,
      password,
      password_confirmation: confirmPassword
    });
  }

  // User login
  async login(email, password) {
    return apiClient.post('login', {
      email,
      password
    });
  }

  // User logout
  async logout(token) {
    return apiClient.post('logout', {}, token);
  }

  // Get current user profile
  async getProfile(token) {
    return apiClient.get('user/profile', token);
  }

  // Update user profile
  async updateProfile(userData, token) {
    return apiClient.put('user/profile', userData, token);
  }

  // Refresh token
  async refreshToken(refreshToken) {
    return apiClient.post('refresh', {
      refresh_token: refreshToken
    });
  }

  // Forgot password
  async forgotPassword(email) {
    return apiClient.post('forgot-password', {
      email
    });
  }

  // Reset password
  async resetPassword(token, email, password, passwordConfirmation) {
    return apiClient.post('reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation
    });
  }
}

export default new AuthApi(); 