import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serverReducer from './serverSlice';

// Function to load the auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return undefined; // No state found, let reducers handle initialization
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Function to save the auth state to localStorage
const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Prepare the preloaded state by loading the auth state
const preloadedState = {
  auth: loadAuthState(),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    servers: serverReducer,
  },
  // Initialize the store with state from localStorage (if available)
  preloadedState,
});

// Subscribe to store updates
store.subscribe(() => {
  // Save the auth slice of the state to localStorage on every change
  saveAuthState(store.getState().auth);
});