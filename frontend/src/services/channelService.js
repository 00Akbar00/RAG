import channelApi from './api/channel/channelApi';

class ChannelService {
  // Get all channels for a guild
  async getGuildChannels(guildId, token) {
    try {
      const response = await channelApi.getGuildChannels(guildId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Channels retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve channels'
      };
    }
  }

  // Create a new channel
  async createChannel(guildId, channelData, token) {
    try {
      const response = await channelApi.createChannel(guildId, channelData, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Channel created successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create channel'
      };
    }
  }

  // Get a specific channel
  async getChannel(channelId, token) {
    try {
      const response = await channelApi.getChannel(channelId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Channel retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve channel'
      };
    }
  }

  // Update a channel
  async updateChannel(channelId, updateData, token) {
    try {
      const response = await channelApi.updateChannel(channelId, updateData, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Channel updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update channel'
      };
    }
  }

  // Delete a channel
  async deleteChannel(channelId, token) {
    try {
      await channelApi.deleteChannel(channelId, token);
      return {
        success: true,
        message: 'Channel deleted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete channel'
      };
    }
  }

  // Get channel messages
  async getChannelMessages(channelId, token, limit = 50, before = null) {
    try {
      const response = await channelApi.getChannelMessages(channelId, token, limit, before);
      return {
        success: true,
        data: response.data || response,
        message: 'Messages retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve messages'
      };
    }
  }

  // Send a message to a channel
  async sendMessage(channelId, message, token) {
    try {
      const response = await channelApi.sendMessage(channelId, message, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Message sent successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to send message'
      };
    }
  }

  // Update a message
  async updateMessage(channelId, messageId, content, token) {
    try {
      const response = await channelApi.updateMessage(channelId, messageId, content, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Message updated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update message'
      };
    }
  }

  // Delete a message
  async deleteMessage(channelId, messageId, token) {
    try {
      await channelApi.deleteMessage(channelId, messageId, token);
      return {
        success: true,
        message: 'Message deleted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete message'
      };
    }
  }

  // Pin a message
  async pinMessage(channelId, messageId, token) {
    try {
      const response = await channelApi.pinMessage(channelId, messageId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Message pinned successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to pin message'
      };
    }
  }

  // Unpin a message
  async unpinMessage(channelId, messageId, token) {
    try {
      await channelApi.unpinMessage(channelId, messageId, token);
      return {
        success: true,
        message: 'Message unpinned successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to unpin message'
      };
    }
  }

  // Get pinned messages
  async getPinnedMessages(channelId, token) {
    try {
      const response = await channelApi.getPinnedMessages(channelId, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Pinned messages retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve pinned messages'
      };
    }
  }

  // Add reaction to message
  async addReaction(channelId, messageId, emoji, token) {
    try {
      const response = await channelApi.addReaction(channelId, messageId, emoji, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Reaction added successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to add reaction'
      };
    }
  }

  // Remove reaction from message
  async removeReaction(channelId, messageId, emoji, token) {
    try {
      await channelApi.removeReaction(channelId, messageId, emoji, token);
      return {
        success: true,
        message: 'Reaction removed successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to remove reaction'
      };
    }
  }

  // Get message reactions
  async getMessageReactions(channelId, messageId, emoji, token) {
    try {
      const response = await channelApi.getMessageReactions(channelId, messageId, emoji, token);
      return {
        success: true,
        data: response.data || response,
        message: 'Reactions retrieved successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve reactions'
      };
    }
  }

  // Validate channel data
  validateChannelData(channelData) {
    const errors = [];

    if (!channelData.name || channelData.name.trim().length === 0) {
      errors.push('Channel name is required');
    }

    if (channelData.name && channelData.name.length > 100) {
      errors.push('Channel name must be less than 100 characters');
    }

    if (channelData.type && !['text', 'voice'].includes(channelData.type)) {
      errors.push('Channel type must be either "text" or "voice"');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format channel data for display
  formatChannelForDisplay(channel) {
    return {
      id: channel.id,
      name: channel.name,
      type: channel.type || 'text',
      guild_id: channel.guild_id,
      created_at: channel.created_at,
      updated_at: channel.updated_at
    };
  }

  // Format message data for display
  formatMessageForDisplay(message) {
    return {
      id: message.id,
      content: message.content,
      user: message.user,
      channel_id: message.channel_id,
      created_at: message.created_at,
      updated_at: message.updated_at,
      reactions: message.reactions || [],
      is_pinned: message.is_pinned || false
    };
  }
}

export default new ChannelService(); 