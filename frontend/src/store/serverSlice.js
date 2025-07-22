import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { guildService } from '../services';

// Async thunk to fetch all guilds
export const fetchGuilds = createAsyncThunk(
  'servers/fetchGuilds',
  async (token, { rejectWithValue }) => {
    try {
      const result = await guildService.getAllGuilds(token);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create a new guild
export const createNewGuild = createAsyncThunk(
  'servers/createGuild',
  async ({ name, iconFile, token }, { rejectWithValue }) => {
    try {
      const result = await guildService.createGuild(name, iconFile, token);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a specific guild
export const fetchGuild = createAsyncThunk(
  'servers/fetchGuild',
  async ({ guildId, token }, { rejectWithValue }) => {
    try {
      const result = await guildService.getGuild(guildId, token);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update a guild
export const updateGuild = createAsyncThunk(
  'servers/updateGuild',
  async ({ guildId, updateData, token }, { rejectWithValue }) => {
    try {
      const result = await guildService.updateGuild(guildId, updateData, token);
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a guild
export const deleteGuild = createAsyncThunk(
  'servers/deleteGuild',
  async ({ guildId, token }, { rejectWithValue }) => {
    try {
      const result = await guildService.deleteGuild(guildId, token);
      if (result.success) {
        return guildId;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch guild members
export const fetchGuildMembers = createAsyncThunk(
  'servers/fetchGuildMembers',
  async ({ guildId, token }, { rejectWithValue }) => {
    try {
      const result = await guildService.getGuildMembers(guildId, token);
      if (result.success) {
        return { guildId, members: result.data };
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  guilds: [],
  activeGuild: null,
  guildMembers: {},
  isLoading: false,
  error: null,
};

const serverSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setActiveGuild: (state, action) => {
      state.activeGuild = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addGuild: (state, action) => {
      state.guilds.push(action.payload);
    },
    updateGuildInList: (state, action) => {
      const index = state.guilds.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.guilds[index] = action.payload;
      }
    },
    removeGuild: (state, action) => {
      state.guilds = state.guilds.filter(g => g.id !== action.payload);
      if (state.activeGuild === action.payload) {
        state.activeGuild = state.guilds.length > 0 ? state.guilds[0].id : null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Guilds
      .addCase(fetchGuilds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuilds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guilds = action.payload;
        if (action.payload.length > 0 && !state.activeGuild) {
          state.activeGuild = action.payload[0].id;
        }
      })
      .addCase(fetchGuilds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Guild
      .addCase(createNewGuild.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewGuild.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guilds.push(action.payload);
        state.activeGuild = action.payload.id;
      })
      .addCase(createNewGuild.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Single Guild
      .addCase(fetchGuild.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuild.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the guild in the list if it exists, otherwise add it
        const index = state.guilds.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.guilds[index] = action.payload;
        } else {
          state.guilds.push(action.payload);
        }
      })
      .addCase(fetchGuild.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Guild
      .addCase(updateGuild.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGuild.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.guilds.findIndex(g => g.id === action.payload.id);
        if (index !== -1) {
          state.guilds[index] = action.payload;
        }
      })
      .addCase(updateGuild.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Guild
      .addCase(deleteGuild.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteGuild.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guilds = state.guilds.filter(g => g.id !== action.payload);
        if (state.activeGuild === action.payload) {
          state.activeGuild = state.guilds.length > 0 ? state.guilds[0].id : null;
        }
      })
      .addCase(deleteGuild.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Guild Members
      .addCase(fetchGuildMembers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuildMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guildMembers[action.payload.guildId] = action.payload.members;
      })
      .addCase(fetchGuildMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setActiveGuild, 
  clearError, 
  addGuild, 
  updateGuildInList, 
  removeGuild 
} = serverSlice.actions;
export default serverSlice.reducer;