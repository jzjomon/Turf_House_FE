import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spinner : false
}

const spinnerSlice = createSlice({
    name : "spinner",
    initialState,
    reducers : {
        setSpinner : (state, action) => {
            state.spinner = action.payload
        }
    }
});

export const { setSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer