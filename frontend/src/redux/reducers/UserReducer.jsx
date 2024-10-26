import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    allUsers: null,
    isLoggedin: false
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedin: function(state,action) {
            state.isLoggedin = action.payload
        },
        setAllUsers: function(state,action) {
            state.allUsers = action.payload
        },
        setcurrentUser: function(state,action) {
            state.currentUser = action.payload
        }
    }
})

export default UserSlice.reducer

export const { setLoggedin,setAllUsers,setcurrentUser } = UserSlice.actions