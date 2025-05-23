import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: { jobs: [] },
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
    },
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
