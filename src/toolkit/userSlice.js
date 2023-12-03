import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : null,
}

const userSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUserLogin : (state, action) => {
            state.user = action.payload.user;
        },
        
    }
})

export const { setUserLogin } = userSlice.actions;
export default userSlice.reducer;