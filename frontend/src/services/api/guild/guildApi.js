import apiClient from '../client';

class GuildApi {
  // Get all guilds for the current user
  async getAllGuilds(token) {
    console.log('🔄 getAllGuilds API called with token:', token ? 'present' : 'missing');
    const data = await apiClient.get('user/guilds', token);
    console.log('✅ getAllGuilds API response:', data);
    return data;
  }

  // Create a new guild
  async createGuild(name, iconFile, token) {
    const formData = new FormData();
    formData.append('name', name);
    
    if (iconFile) {
      formData.append('icon_url', iconFile);
    }

    return apiClient.postForm('guild', formData, token);
  }

  // Get a specific guild by ID
  async getGuild(guildId, token) {
    console.log('🔄 getGuild API called for guildId:', guildId);
    const data = await apiClient.get(`guild/${guildId}`, token);
    console.log('✅ getGuild API response for guildId:', guildId, data);
    return data;
  }

  // Update a guild
  async updateGuild(guildId, updateData, token) {
    return apiClient.put(`guild/${guildId}`, updateData, token);
  }

  // Delete a guild
  async deleteGuild(guildId, token) {
    return apiClient.delete(`guild/${guildId}`, token);
  }

  // Get guild members
  async getGuildMembers(guildId, token) {
    return apiClient.get(`guild/${guildId}/members`, token);
  }

  // Add member to guild
  async addMemberToGuild(guildId, userId, token) {
    return apiClient.post(`guild/${guildId}/members`, { user_id: userId }, token);
  }

  // Remove member from guild
  async removeMemberFromGuild(guildId, userId, token) {
    return apiClient.delete(`guild/${guildId}/members/${userId}`, token);
  }

  // Update member role
  async updateMemberRole(guildId, userId, role, token) {
    return apiClient.put(`guild/${guildId}/members/${userId}`, { role }, token);
  }

  // Leave guild
  async leaveGuild(guildId, token) {
    return apiClient.delete(`guild/${guildId}/leave`, token);
  }
}

export default new GuildApi(); 