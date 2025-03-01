import { createSlice } from '@reduxjs/toolkit';

export const META_AUTH = {
    AUTHENTICATED: 'authenticated',
    CHECKING: 'checking',
    UNAUTHENTICATED: 'unauthenticated',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: META_AUTH.UNAUTHENTICATED,
        user: {}
    },
    reducers: {
        onChecking: (state) => {
            state.status = META_AUTH.CHECKING;
            state.user = {};
        },
        onLogin: (state, { payload }) => {
            state.status = META_AUTH.AUTHENTICATED;
            state.user = payload;
        },
        onLogout: (state) => {
            state.status = META_AUTH.UNAUTHENTICATED;
            state.user = {};
        }
    }
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;