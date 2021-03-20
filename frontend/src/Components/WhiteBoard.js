import React, { useState, useEffect, useRef } from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import CreateIcon from "@material-ui/icons/Create";
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
	deleteIconBtn: {
		backgroundColor: "#cc0000",
		color: "white",
		"&:hover": {
			backgroundColor: "#ff0000",
		},
		marginLeft: 20,
		marginBottom: 10,
	},
	drawBlue: {
		backgroundColor: "#1111ff !important",
		color: "white",
		marginLeft: 20,
		marginBottom: 10,
	},
	drawOrange: {
		backgroundColor: "orange !important",
		color: "white",
		marginLeft: 20,
		marginBottom: 10,
	},
	drawBlack: {
		backgroundColor: "black !important",
		color: "white",
		marginLeft: 20,
		marginBottom: 10,
	},
}));

function Whiteboard(props) {
	const width = 800;
	const height = 500;
	const classes = useStyles();
	const [painting, setPainting] = useState(false);
	const [updateDrawing, setUpdateDrawing] = useState(true);
	const [erase, setErase] = useState(false);
	const [ctx, setCtx] = useState(null);
	const [lastX, setLastX] = useState();
	const [lastY, setLastY] = useState();
	const [img, setImg] = useState();
	const canvas = useRef();

	const drawCanvas = (e) => {
		if (painting) {
			let mousepos = findMousePos(e);
			if (erase) {
				ctx.clearRect(mousepos.x - 10, mousepos.y - 10, 20, 20);
			} else {
				ctx.beginPath();
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(mousepos.x, mousepos.y);
				ctx.closePath();
				ctx.stroke();
				setLastX(mousepos.x);
				setLastY(mousepos.y);
			}
			if (updateDrawing) {
				sendBoardToServer();
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
		setPainting(false);
		sendBoardToServer();
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

	const clearCanvas = () => {
		ctx.clearRect(0, 0, width, height);
		sendBoardToServer();
	};

	const sendBoardToServer = () => {
		var imgdata = canvas.current.toDataURL();
		setImg(imgdata);
	};

	const setDrawColor = (color) => {
		setErase(false);
		ctx.strokeStyle = color;
	};

	useEffect(() => {
		setCtx(canvas.current.getContext("2d"));
	}, []);
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={1}>
					<Fab className={classes.deleteIconBtn} onClick={clearCanvas}>
						<DeleteForeverIcon />
					</Fab>
					<br />
					<Fab
						className={classes.drawBlack}
						onClick={() => setDrawColor("black")}
					>
						<CreateIcon />
					</Fab>
					<br />
					<Fab
						className={classes.drawBlue}
						onClick={() => setDrawColor("blue")}
					>
						<CreateIcon />
					</Fab>
					<br />
					<Fab
						className={classes.drawOrange}
						onClick={() => setDrawColor("orange")}
					>
						<CreateIcon />
					</Fab>
					<br />
					<Fab className={classes.deleteIconBtn} onClick={() => setErase(true)}>
						<LayersClearIcon />
					</Fab>
					<br />
				</Grid>
				<Grid item xs={11}>
					<canvas
						ref={canvas}
						id="myCanvas"
						height={height}
						width={width}
						onMouseMove={drawCanvas}
						onClick={drawCanvas}
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						className={classes.canvas}
					></canvas>
				</Grid>
			</Grid>
			<img src={img} alt="output" />
		</div>
	);
}

export default Whiteboard;
