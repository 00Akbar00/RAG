import guildApi from './api/guild/guildApi';

class GuildService {
  // Get all guilds for the current user
  async getAllGuilds(token) {
    try {
      const response = await guildApi.getAllGuilds(token);
      return {
        success: true,
        data: response.data || response,
        message: 'Guilds retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve guilds'
      };
    }
  }

  // Create a new guild
  async createGuild(name, iconFile, token) {
    try {
      const response = await guildApi.createGuild(name, iconFile, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Guild created successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create guild'
      };
    }
  }

  // Get a specific guild
  async getGuild(guildId, token) {
    try {
      const response = await guildApi.getGuild(guildId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Guild retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve guild'
      };
    }
  }

  // Update a guild
  async updateGuild(guildId, updateData, token) {
    try {
      const response = await guildApi.updateGuild(guildId, updateData, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Guild updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update guild'
      };
    }
  }

  // Delete a guild
  async deleteGuild(guildId, token) {
    try {
      await guildApi.deleteGuild(guildId, token);
      return {
        success: true,
        message: 'Guild deleted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete guild'
      };
    }
  }

  // Get guild members
  async getGuildMembers(guildId, token) {
    try {
      const response = await guildApi.getGuildMembers(guildId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Guild members retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve guild members'
      };
    }
  }

  // Add member to guild
  async addMemberToGuild(guildId, userId, token) {
    try {
      const response = await guildApi.addMemberToGuild(guildId, userId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Member added to guild successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to add member to guild'
      };
    }
  }

  // Remove member from guild
  async removeMemberFromGuild(guildId, userId, token) {
    try {
      await guildApi.removeMemberFromGuild(guildId, userId, token);
      return {
        success: true,
        message: 'Member removed from guild successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to remove member from guild'
      };
    }
  }

  // Update member role
  async updateMemberRole(guildId, userId, role, token) {
    try {
      const response = await guildApi.updateMemberRole(guildId, userId, role, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Member role updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update member role'
      };
    }
  }

  // Leave guild
  async leaveGuild(guildId, token) {
    try {
      await guildApi.leaveGuild(guildId, token);
      return {
        success: true,
        message: 'Left guild successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to leave guild'
      };
    }
  }

  // Validate guild data
  validateGuildData(guildData) {
    const errors = [];

    if (!guildData.name || guildData.name.trim().length === 0) {
      errors.push('Guild name is required');
    }

    if (guildData.name && guildData.name.length > 100) {
      errors.push('Guild name must be less than 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format guild data for display
  formatGuildForDisplay(guild) {
    return {
      id: guild.id,
      name: guild.name,
      icon_url: guild.icon_url || `https://via.placeholder.com/50/7289DA/FFFFFF?text=${guild.name.charAt(0).toUpperCase()}`,
      member_count: guild.member_count || 0,
      created_at: guild.created_at,
      updated_at: guild.updated_at
    };
  }
}

export default new GuildService(); 