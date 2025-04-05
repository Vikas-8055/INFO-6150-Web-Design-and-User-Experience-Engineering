import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, users: [] },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { login, logout, setUsers } = userSlice.actions;
export default userSlice.reducer;