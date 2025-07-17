import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signup, login } from '../apis/auth';

// Async thunk for user signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ username, email, password, confirmPassword }, { rejectWithValue }) => {
        try {
            const data = await signup(username, email, password, confirmPassword);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await login(email, password);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // 👇 **This is the corrected part**
                state.user = action.payload.data.user;
                state.token = action.payload.data.access_token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;