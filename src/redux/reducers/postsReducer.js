import { createSlice } from "@reduxjs/toolkit";
import { getSinglePost as getPost, addPost as createPost, getPosts } from "../../WebAPI";

const initialState = {
  posts: [],
  post: {},
  newPostResponse: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

// actions
export const { setPost, setNewPostResponse, setAllPosts } = postsSlice.actions;

// thunk actions
export const getSinglePost = id => async dispatch => {
  try {
    const res = await getPost(id);
    return dispatch(setPost(res));
  } catch (err) {
    return console.log("error", err);
  }
};

export const getAllPosts = () => async dispatch => {
  try {
    const res = await getPosts();
    return dispatch(setAllPosts(res));
  } catch (err) {
    console.log('error', err);
  }
};

export const addPost = (title, content) => async dispatch => {
  try {
    const res = await createPost(title, content);
    return dispatch(setNewPostResponse(res));
  } catch (err) {
    return console.log("error", err);
  }
};

// selectors
export const selectAllPosts = store => store.posts.posts;
export const selectPost = store => store.posts.post;
export const selectNewPostResponse = store => store.posts.newPostResponse;

// reducer
export default postsSlice.reducer;
