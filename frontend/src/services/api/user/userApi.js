import apiClient from '../client';

class UserApi {
  // Get user profile
  async getUserProfile(userId, token) {
    return apiClient.get(`user/${userId}`, token);
  }

  // Update user profile
  async updateUserProfile(userId, profileData, token) {
    return apiClient.put(`user/${userId}`, profileData, token);
  }

  // Update user avatar
  async updateUserAvatar(userId, avatarFile, token) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    
    return apiClient.postForm(`user/${userId}/avatar`, formData, token);
  }

  // Delete user avatar
  async deleteUserAvatar(userId, token) {
    return apiClient.delete(`user/${userId}/avatar`, token);
  }

  // Get user status
  async getUserStatus(userId, token) {
    return apiClient.get(`user/${userId}/status`, token);
  }

  // Update user status
  async updateUserStatus(userId, status, token) {
    return apiClient.put(`user/${userId}/status`, { status }, token);
  }

  // Get user friends
  async getUserFriends(token) {
    return apiClient.get('user/friends', token);
  }

  // Send friend request
  async sendFriendRequest(userId, token) {
    return apiClient.post(`user/${userId}/friend-request`, {}, token);
  }

  // Accept friend request
  async acceptFriendRequest(requestId, token) {
    return apiClient.post(`user/friend-request/${requestId}/accept`, {}, token);
  }

  // Decline friend request
  async declineFriendRequest(requestId, token) {
    return apiClient.post(`user/friend-request/${requestId}/decline`, {}, token);
  }

  // Remove friend
  async removeFriend(userId, token) {
    return apiClient.delete(`user/${userId}/friend`, token);
  }

  // Get user settings
  async getUserSettings(token) {
    return apiClient.get('user/settings', token);
  }

  // Update user settings
  async updateUserSettings(settings, token) {
    return apiClient.put('user/settings', settings, token);
  }

  // Get user notifications
  async getUserNotifications(token) {
    return apiClient.get('user/notifications', token);
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId, token) {
    return apiClient.put(`user/notifications/${notificationId}/read`, {}, token);
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(token) {
    return apiClient.put('user/notifications/read-all', {}, token);
  }

  // Delete notification
  async deleteNotification(notificationId, token) {
    return apiClient.delete(`user/notifications/${notificationId}`, token);
  }

  // Search users
  async searchUsers(query, token) {
    return apiClient.get(`user/search?q=${encodeURIComponent(query)}`, token);
  }

  // Get user activity
  async getUserActivity(userId, token) {
    return apiClient.get(`user/${userId}/activity`, token);
  }
}

export default new UserApi(); 