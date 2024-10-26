import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: null
}

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setAllPosts: function(state,action) {
            state.allPosts = action.payload
        }
    }
})

export default PostSlice.reducer
export const { setAllPosts } = PostSlice.actions
