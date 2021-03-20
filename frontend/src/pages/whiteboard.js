import React from "react";
import Whiteboard from "../Components/WhiteBoard";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
	},
}));

function WhiteboardPage(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Whiteboard />
		</div>
	);
}

export default WhiteboardPage;
