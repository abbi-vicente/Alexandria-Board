import * as api from "../api/index";
import { AUTH } from "../constants/actionTypes";

// log in existing user
export const login = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.logIn(formData);

		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {
		console.log(error);
	}
};

// sign up if user doesn't have an account
export const signup = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
