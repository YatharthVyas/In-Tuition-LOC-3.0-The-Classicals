import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
		marginLeft: "-10%",
	},
	canvas: {
		backgroundColor: "#ededed",
		border: "3px solid #999",
	},
}));

function Whiteboard(props) {
	const classes = useStyles();
	const [painting, setPainting] = useState(false);
	const [updateDrawing, setUpdateDrawing] = useState(true);
	const [ctx, setCtx] = useState(null);
	const [lastX, setLastX] = useState();
	const [lastY, setLastY] = useState();
	const [img, setImg] = useState();
	const canvas = useRef();

	const drawCanvas = (e) => {
		if (painting) {
			let mousepos = findMousePos(e);
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(mousepos.x, mousepos.y);
			ctx.closePath();
			ctx.stroke();
			setLastX(mousepos.x);
			setLastY(mousepos.y);
			if (updateDrawing) {
				var imgdata = canvas.current.toDataURL();
				setImg(imgdata);
				setUpdateDrawing(false);
				setTimeout(() => setUpdateDrawing(true), 300);
			}
		}
	};

	const onMouseDown = (e) => {
		var m = findMousePos(e);
		setLastX(m.x);
		setLastY(m.y);
		setPainting(true);
	};

	const onMouseUp = () => {
		var imgdata = canvas.current.toDataURL();
		setImg(imgdata);
		setPainting(false);
	};

	const findMousePos = (evt) => {
		var rectBorder = canvas.current.getBoundingClientRect(); //Accounts for scroll distance and margin outside canvas
		var mouseX = evt.clientX - rectBorder.left;
		var mouseY = evt.clientY - rectBorder.top;
		return {
			x: mouseX,
			y: mouseY,
		};
	};

	useEffect(() => {
		setCtx(canvas.current.getContext("2d"));
	}, []);
	return (
		<div className={classes.root}>
			<Fab>
				<DeleteForeverIcon />
			</Fab>
			<canvas
				ref={canvas}
				id="myCanvas"
				height="500"
				width="800"
				onMouseMove={drawCanvas}
				onClick={drawCanvas}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				className={classes.canvas}
			></canvas>
			<img src={img} alt="output" />
		</div>
	);
}

export default Whiteboard;
