import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
// for tags
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const query = useQuery();
	const navigate = useNavigate();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const classes = useStyles();
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	const searchUserPost = () => {
		if (search.trim()) {
			dispatch(getPostsBySearch({ search }));
			navigate(`/posts/search?searchQuery=${search || "none"}`);
		} else {
			navigate("/");
		}
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			// search user
			searchUserPost();
		}
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justify="space-between" align-items="stretch" spacing={3} className={classes.gridContainer}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search User"
								onKeyDown={handleKeyPress}
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={searchUserPost} className={classes.searchButton} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
