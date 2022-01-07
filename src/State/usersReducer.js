import { createSlice } from "@reduxjs/toolkit";

export const usersReducer = createSlice({
    name: "users",
    initialState: {
        list: []
    },
    reducers: {
        fetchUser(state, action) {
            state.list.push(action.payload)
    }
}
});

export const { fetchUser } = usersReducer.actions;

export default usersReducer.reducer;