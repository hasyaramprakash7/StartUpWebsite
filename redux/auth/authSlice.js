import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/api';

export const sendOtp = createAsyncThunk('auth/sendOtp', async ({ phone, name, role }, thunkAPI) => {
    try {
        await API.post('/auth/send-otp', { phone, name, role });
        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ phone, otp, role }, thunkAPI) => {
    try {
        const res = await API.post('/auth/verify-otp', { phone, otp, role });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        return { token, user };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'OTP verification failed');
    }
});

export const emailSignup = createAsyncThunk('auth/emailSignup', async (form, thunkAPI) => {
    try {
        const res = await API.post('/auth/signup', form);
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        return { token, user };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password, role }, thunkAPI) => {
    try {
        const res = await API.post('/auth/login', { email, password, role });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        return { token, user };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

export const getDashboard = createAsyncThunk('auth/getDashboard', async (_, thunkAPI) => {
    try {
        const res = await API.get('/auth/dashboard');
        return { user: res.data.user, message: res.data.message };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Unauthorized');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        error: null,
        token: localStorage.getItem('token') || null,
        user: null,
        otpSent: false,
        dashboardMessage: '',
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.otpSent = false;
            localStorage.removeItem('token');
        },
        resetOtp: (state) => {
            state.otpSent = false;
        },
        clearError: (state) => { // Added clearError reducer
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // sendOtp cases
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null; // Clear error on success
            })
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // verifyOtp cases
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.otpSent = false; // Reset otpSent after successful verification
                state.error = null; // Clear error on success
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // emailSignup cases
            .addCase(emailSignup.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.otpSent = false; // Ensure otpSent is false on successful email signup
                state.error = null; // Clear error on success
            })
            .addCase(emailSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(emailSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // loginUser cases (UPDATED)
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.otpSent = false; // Crucial: Reset otpSent on successful email login
                state.error = null; // Clear error on successful login
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // getDashboard cases
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.dashboardMessage = action.payload.message;
                state.loading = false;
                state.error = null; // Clear error on success
            })
            .addCase(getDashboard.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { logout, resetOtp, clearError } = authSlice.actions; // Export clearError
export default authSlice.reducer;