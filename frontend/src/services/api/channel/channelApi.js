import apiClient from '../client';

class ChannelApi {
  // Get all channels for a guild
  async getGuildChannels(guildId, token) {
    return apiClient.get(`guild/${guildId}/channels`, token);
  }

  // Create a new channel
  async createChannel(guildId, channelData, token) {
    return apiClient.post(`guild/${guildId}/channels`, channelData, token);
  }

  // Get a specific channel
  async getChannel(channelId, token) {
    return apiClient.get(`channel/${channelId}`, token);
  }

  // Update a channel
  async updateChannel(channelId, updateData, token) {
    return apiClient.put(`channel/${channelId}`, updateData, token);
  }

  // Delete a channel
  async deleteChannel(channelId, token) {
    return apiClient.delete(`channel/${channelId}`, token);
  }

  // Get channel messages
  async getChannelMessages(channelId, token, limit = 50, before = null) {
    let endpoint = `channel/${channelId}/messages?limit=${limit}`;
    if (before) {
      endpoint += `&before=${before}`;
    }
    return apiClient.get(endpoint, token);
  }

  // Send a message to a channel
  async sendMessage(channelId, message, token) {
    return apiClient.post(`channel/${channelId}/messages`, {
      content: message
    }, token);
  }

  // Update a message
  async updateMessage(channelId, messageId, content, token) {
    return apiClient.put(`channel/${channelId}/messages/${messageId}`, {
      content
    }, token);
  }

  // Delete a message
  async deleteMessage(channelId, messageId, token) {
    return apiClient.delete(`channel/${channelId}/messages/${messageId}`, token);
  }

  // Pin a message
  async pinMessage(channelId, messageId, token) {
    return apiClient.post(`channel/${channelId}/messages/${messageId}/pin`, {}, token);
  }

  // Unpin a message
  async unpinMessage(channelId, messageId, token) {
    return apiClient.delete(`channel/${channelId}/messages/${messageId}/pin`, token);
  }

  // Get pinned messages
  async getPinnedMessages(channelId, token) {
    return apiClient.get(`channel/${channelId}/pins`, token);
  }

  // Add reaction to message
  async addReaction(channelId, messageId, emoji, token) {
    return apiClient.post(`channel/${channelId}/messages/${messageId}/reactions/${emoji}`, {}, token);
  }

  // Remove reaction from message
  async removeReaction(channelId, messageId, emoji, token) {
    return apiClient.delete(`channel/${channelId}/messages/${messageId}/reactions/${emoji}`, token);
  }

  // Get message reactions
  async getMessageReactions(channelId, messageId, emoji, token) {
    return apiClient.get(`channel/${channelId}/messages/${messageId}/reactions/${emoji}`, token);
  }
}

export default new ChannelApi(); 