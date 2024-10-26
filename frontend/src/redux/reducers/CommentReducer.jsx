import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allComments: null,
    postComments: null
}

export const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setPostComments: function(state,action) {
            state.postComments = action.payload
        }
    }
})

export default CommentSlice.reducer
export const { setPostComments } = CommentSlice.actions