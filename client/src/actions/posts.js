import * as api from "../api/index";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

// Action Creators
// displays all existing posts
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

// post creation
export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

// edit certain post
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

// delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

// like a certain post
export const likePost = (id) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("profile"));
	try {
		const { data } = await api.likePost(id, user?.token);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
