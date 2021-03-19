import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
	},
}));

function Home(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
	
    	</div>
	);
}

export default Home;