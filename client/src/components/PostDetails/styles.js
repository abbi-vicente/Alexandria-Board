import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	media: {
		borderRadius: "2vh",
		objectFit: "cover",
		width: "100%",
		maxHeight: "60vh",
	},
	card: {
		display: "flex",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
			flexDirection: "column",
		},
	},
	section: {
		borderRadius: "2vh",
		margin: "1vh",
		flex: 1,
	},
	imageSection: {
		marginLeft: "2vh",
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0,
		},
	},
	recommendedPosts: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	loadingPaper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "2vh",
		borderRadius: "1.5vh",
		height: "39vh",
	},
	commentsOuter: {
		display: "flex",
		justifyContent: "space-between",
	},
	commentsInner: {
		height: "20vh",
		overflowY: "auto",
		marginRight: "3vh",
	},
}));
