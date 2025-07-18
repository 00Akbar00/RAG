import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  servers: [
    { id: '1', name: 'My Gaming Server', imageUrl: 'https://via.placeholder.com/50/7289DA/FFFFFF?text=G' },
    { id: '2', name: 'Study Group', imageUrl: 'https://via.placeholder.com/50/43B581/FFFFFF?text=S' },
    { id: '3', name: 'Art Club', imageUrl: 'https://via.placeholder.com/50/FAA61A/FFFFFF?text=A' },
  ],
  activeServer: '1',
};

const serverSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    addServer: {
      reducer(state, action) {
        state.servers.push(action.payload);
      },
      prepare(server) {
        return {
          payload: {
            id: nanoid(),
            ...server,
          },
        };
      },
    },
    setActiveServer(state, action) {
      state.activeServer = action.payload;
    },
  },
});

export const { addServer, setActiveServer } = serverSlice.actions;
export default serverSlice.reducer;