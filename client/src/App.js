import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Homepage/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
	const user = JSON.parse(localStorage.getItem("profile"));

	return (
		<BrowserRouter>
			<Container maxwidth="xl">
				<Navbar />
				<Routes>
					<Route path="/posts" element={<Home />} />
					<Route path="/" element={<Navigate replace to="/posts" />} />
					<Route path="/posts/search" element={<Home />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					<Route path="/auth" element={() => (!user ? <Auth /> : <Navigate replace to="/posts" />)} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
