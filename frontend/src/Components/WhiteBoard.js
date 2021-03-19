import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
	},
	canvas: {
		backgroundColor: '#ededed',
		border: '3px solid #999'
	}
}));

function Whiteboard(props) {
	const classes = useStyles();
	const [painting, setPainting] = useState(false);
	const [ctx, setCtx] = useState(null);
	const canvas = useRef();

	const drawCanvas = (e) => {
		if(painting) {
			let mousepos = findMousePos(e)
			ctx.fillRect(mousepos.x - 1, mousepos.y - 1, 3, 3);
		}
	}

	const findMousePos = (evt) => {
		var rectBorder = canvas.current.getBoundingClientRect(); //Accounts for scroll distance and margin outside canvas
		var mouseX = evt.clientX - rectBorder.left;
		var mouseY = evt.clientY - rectBorder.top;
		return {
			x: mouseX,
			y: mouseY,
		};
	}

	useEffect(() => {
		setCtx(canvas.current.getContext('2d'))
	}, [])
	return (
		<div className={classes.root}>
			<canvas ref={canvas} id="myCanvas" height="500" width="800" onMouseMove={drawCanvas} onClick={drawCanvas} onMouseDown={()=>setPainting(true)} onMouseUp={()=>setPainting(false)} className={classes.canvas}>
			</canvas>
    	</div>
	);
}

export default Whiteboard;