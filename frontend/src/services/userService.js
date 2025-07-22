import userApi from './api/user/userApi';

class UserService {
  // Get user profile
  async getUserProfile(userId, token) {
    try {
      const response = await userApi.getUserProfile(userId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User profile retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve user profile'
      };
    }
  }

  // Update user profile
  async updateUserProfile(userId, profileData, token) {
    try {
      const response = await userApi.updateUserProfile(userId, profileData, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User profile updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update user profile'
      };
    }
  }

  // Update user avatar
  async updateUserAvatar(userId, avatarFile, token) {
    try {
      const response = await userApi.updateUserAvatar(userId, avatarFile, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Avatar updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update avatar'
      };
    }
  }

  // Delete user avatar
  async deleteUserAvatar(userId, token) {
    try {
      await userApi.deleteUserAvatar(userId, token);
      return {
        success: true,
        message: 'Avatar deleted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete avatar'
      };
    }
  }

  // Get user status
  async getUserStatus(userId, token) {
    try {
      const response = await userApi.getUserStatus(userId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User status retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve user status'
      };
    }
  }

  // Update user status
  async updateUserStatus(userId, status, token) {
    try {
      const response = await userApi.updateUserStatus(userId, status, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User status updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update user status'
      };
    }
  }

  // Get user friends
  async getUserFriends(token) {
    try {
      const response = await userApi.getUserFriends(token);
      return {
        success: true,
        data: response.data || response,
        message: 'Friends list retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve friends list'
      };
    }
  }

  // Send friend request
  async sendFriendRequest(userId, token) {
    try {
      const response = await userApi.sendFriendRequest(userId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Friend request sent successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to send friend request'
      };
    }
  }

  // Accept friend request
  async acceptFriendRequest(requestId, token) {
    try {
      const response = await userApi.acceptFriendRequest(requestId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Friend request accepted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to accept friend request'
      };
    }
  }

  // Decline friend request
  async declineFriendRequest(requestId, token) {
    try {
      const response = await userApi.declineFriendRequest(requestId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Friend request declined successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to decline friend request'
      };
    }
  }

  // Remove friend
  async removeFriend(userId, token) {
    try {
      await userApi.removeFriend(userId, token);
      return {
        success: true,
        message: 'Friend removed successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to remove friend'
      };
    }
  }

  // Get user settings
  async getUserSettings(token) {
    try {
      const response = await userApi.getUserSettings(token);
      return {
        success: true,
        data: response.data || response,
        message: 'User settings retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve user settings'
      };
    }
  }

  // Update user settings
  async updateUserSettings(settings, token) {
    try {
      const response = await userApi.updateUserSettings(settings, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User settings updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update user settings'
      };
    }
  }

  // Get user notifications
  async getUserNotifications(token) {
    try {
      const response = await userApi.getUserNotifications(token);
      return {
        success: true,
        data: response.data || response,
        message: 'Notifications retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve notifications'
      };
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId, token) {
    try {
      const response = await userApi.markNotificationAsRead(notificationId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Notification marked as read!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to mark notification as read'
      };
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(token) {
    try {
      const response = await userApi.markAllNotificationsAsRead(token);
      return {
        success: true,
        data: response.data || response,
        message: 'All notifications marked as read!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to mark all notifications as read'
      };
    }
  }

  // Delete notification
  async deleteNotification(notificationId, token) {
    try {
      await userApi.deleteNotification(notificationId, token);
      return {
        success: true,
        message: 'Notification deleted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete notification'
      };
    }
  }

  // Search users
  async searchUsers(query, token) {
    try {
      const response = await userApi.searchUsers(query, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Users found successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to search users'
      };
    }
  }

  // Get user activity
  async getUserActivity(userId, token) {
    try {
      const response = await userApi.getUserActivity(userId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'User activity retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve user activity'
      };
    }
  }

  // Validate user profile data
  validateUserProfileData(profileData) {
    const errors = [];

    if (profileData.user_name && profileData.user_name.length > 50) {
      errors.push('Username must be less than 50 characters');
    }

    if (profileData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      errors.push('Invalid email format');
    }

    if (profileData.bio && profileData.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format user data for display
  formatUserForDisplay(user) {
    return {
      id: user.id,
      user_name: user.user_name || user.name,
      email: user.email,
      avatar_url: user.avatar_url || `https://via.placeholder.com/50/7289DA/FFFFFF?text=${(user.user_name || user.name || 'U').charAt(0).toUpperCase()}`,
      bio: user.bio || '',
      status: user.status || 'offline',
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }
}

export default new UserService(); 