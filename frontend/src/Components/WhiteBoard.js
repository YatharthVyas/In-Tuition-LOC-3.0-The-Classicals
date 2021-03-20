import React, { useState, useEffect, useRef } from "react";
import Chatbox from "./chatbox.js";
import Attentive from "./attentive.js";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./firebase";
import axios from "axios";
import "firebase/database";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
		marginLeft: "-10%",
	},
	canvas: {
		backgroundColor: "#ededed",
		boxShadow:
			" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	},
	deleteIconBtn: {
		backgroundColor: "#cc0000",
		color: "white",
		"&:hover": {
			backgroundColor: "#ff0000",
		},
		marginLeft: 5,
		marginBottom: 10,
	},
	drawBlue: {
		backgroundColor: "#1111ff !important",
		color: "white",
		marginLeft: 5,
		marginBottom: 10,
	},
	drawGreen: {
		backgroundColor: "green !important",
		color: "white",
		marginLeft: 5,
		marginBottom: 10,
	},
	drawOrange: {
		backgroundColor: "orange !important",
		color: "white",
		marginLeft: 5,
		marginBottom: 10,
	},
	drawPurple: {
		backgroundColor: "purple !important",
		color: "white",
		marginLeft: 5,
		marginBottom: 10,
	},
	drawBlack: {
		backgroundColor: "black !important",
		color: "white",
		marginLeft: 5,
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
	const [img, setImg] = useState("");
	const [imgOut, setImgOut] = useState("");
	const canvas = useRef();

	const checkAttention = () => {
		let config = {
			method: "get",
			url: "http://localhost:8000/tutor/attentive/?checkStr=asda",
			headers: {},
		};

		axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
		ctx.fillStyle = "#ededed";
		ctx.fillRect(0, 0, width, height);
		sendBoardToServer();
	};

	const sendBoardToServer = () => {
		var imgdata = canvas.current.toDataURL();
		setImg(imgdata);
		firebase.database().ref(`Chats/abc`).update({ imgURL: imgdata });
	};

	const setDrawColor = (color) => {
		setErase(false);
		ctx.strokeStyle = color;
	};

	useEffect(() => {
		setCtx(canvas.current.getContext("2d"));
		var t = canvas.current.getContext("2d");
		t.fillStyle = "#ededed";
		t.fillRect(0, 0, width, height);
		t.fillStyle = "black";
		const onChildAdded = firebase
			.database()
			.ref(`WhiteBoard/abc`)
			.on("child_changed", (snapshot) => {
				setImgOut(snapshot.toJSON());
				//console.log("VAL", snapshot.val());
			});
		return () =>
			firebase.database().ref("WhiteBoard").off("child_added", onChildAdded);
	}, []);
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={9}>
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
								className={classes.drawGreen}
								onClick={() => setDrawColor("green")}
							>
								<CreateIcon />
							</Fab>
							<br />
							<Fab
								className={classes.drawPurple}
								onClick={() => setDrawColor("purple")}
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
							<Fab
								className={classes.deleteIconBtn}
								onClick={() => setErase(true)}
							>
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
				</Grid>
				<Grid item xs={3}>
					<Chatbox />
				</Grid>
			</Grid>
			{localStorage.getItem("isStudent") === "true" ? (
				<Attentive />
			) : (
				<Button color="primary" onSubmit={checkAttention}>
					Attentiveness Check
				</Button>
			)}
			{imgOut && localStorage.getItem("isStudent") === "true" && (
				<div>
					<img src={imgOut} height="500px" width="800px" alt="whiteboard" />{" "}
					<br />
					<div align="center">
						<a href={imgOut} download="Lecture_Screenshot.png">
							<Button color="primary" variant="contained">
								{" "}
								<SystemUpdateAltIcon style={{ marginRight: 20 }} /> Capture
								Notes
							</Button>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default Whiteboard;
