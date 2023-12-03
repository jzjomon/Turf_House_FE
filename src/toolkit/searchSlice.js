import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInput : null
}

const searchSlice = createSlice({
    name : "search",
    initialState,
    reducers : {
        setSearchInput : (state,action) => {
            state.searchInput = action.payload
        }
    }
})

export const { setSearchInput } = searchSlice.actions;
export default searchSlice.reducer;