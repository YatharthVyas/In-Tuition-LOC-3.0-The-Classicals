import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "../Components/firebase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "firebase/storage";
import "firebase/database";
import { scheduleAssignment, getAssignment } from "./helper";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	container: {
		display: "block",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	paperBorder: {
		borderStyle: "solid",
		borderRadius: "10px",
		borderColor: theme.palette.primary.main,
		borderWidth: "2px",
		height: "120px",
		padding: "20px",
	},
	form: {
		borderRadius: "10px",
		boxShadow:
			" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
		padding: "20px",
	},
}));

export default function Assignment() {
	const params = useParams();
	const history = useHistory();
	console.log(params.cid);

	const classes = useStyles();
	const [name, setName] = useState("");
	const [dateTime, setDateTime] = useState(new Date().toISOString());
	const [pathFire, setPathFire] = useState("");
	const [image, setImage] = useState(null);
	const [assignments, setAssignments] = useState([]);

	const uploadToFirebaseStorage = async (e) => {
		const file = e.target.files[0];
		const id = uuid();
		const storageRef = firebase.storage().ref("Assignments").child(id);
		await storageRef.put(file);
		storageRef.getDownloadURL().then((url) => {
			// imageRef.set(url);
			onSubmit(url);
			// setPathFire(url);
		});
	};
	useEffect(() => {
		// console.log(image);
		console.log(dateTime);
		getAssignment(params.cid).then((res) => {
			console.log(res);
			setAssignments(res);
		});
	}, []);
	const onSubmit = (url) => {
		console.log(url);
		// if (proceed) {
		console.log(dateTime);
		// uploadToFirebaseStorage();

		let a = new Date(dateTime).toISOString();
		console.log(a);
		let utcDate = a.substring(0, 10);
		let utcTime = a.substring(11, 16);
		console.log(utcDate);
		console.log(utcTime);
		let b = dateTime.toString();
		let istDateTime = b.substring(0, 21);
		var dt = istDateTime.split("T");
		console.log(istDateTime);
		let assignment = {};
		// let batchId = "6055f18d109fae0004b682d0";
		assignment.batchId = params.cid;
		assignment.name = name;
		assignment.date = utcDate;
		assignment.time = utcTime;
		assignment.istDateTime = istDateTime;
		assignment.path = url;
		// assignment.fileName = res.name;
		// assignment.filePathLocal = res.uri;
		console.log("ASSIGN", assignment);
		scheduleAssignment(assignment).then(() => {
			// navigation.goBack();
			console.log("SUCCESS");
		});
	};

	return (
		<div>
			<br />
			{localStorage.getItem("isStudent") == "false" ? (
				<div className={classes.form}>
					<form className={classes.container} noValidate>
						<TextField
							required
							id="standard-required"
							label="Required"
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
						/>{" "}
						<br />
						<br />
						<TextField
							style={{ marginRight: 60 }}
							id="datetime-local"
							label="Next appointment"
							type="datetime-local"
							// defaultValue="2017-05-24T10:30"
							value={dateTime}
							onChange={(e) => {
								setDateTime(e.target.value);
							}}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<br />
						<br />
						{/* <input type="file" onChange={uploadToFirebaseStorage} /> */}
						<TextField type="file" onChange={uploadToFirebaseStorage} />
						{/* Keep this submit button as dummy */}
						<br />
					</form>
					<div align="center">
						<Button
							variant="contained"
							color="primary"
							onClick={() => onSubmit()}
						>
							Upload
						</Button>
					</div>
				</div>
			) : (
				<div>
					<form
						style={{ display: "none" }}
						className={classes.container}
						noValidate
					>
						<TextField
							required
							id="standard-required"
							label="Required"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							id="datetime-local"
							label="Next appointment"
							type="datetime-local"
							// defaultValue="2017-05-24T10:30"
							value={dateTime}
							onChange={(e) => {
								setDateTime(e.target.value);
							}}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						{/* <input type="file" onChange={uploadToFirebaseStorage} /> */}
						<input type="file" onChange={uploadToFirebaseStorage} />
						{/* Keep this submit button as dummy */}
						<button onClick={() => onSubmit()}>Upload</button>
						<br />
					</form>
				</div>
			)}
			<h1>SCHEDULED ASSIGNMENTS</h1> <br />
			{assignments &&
				assignments.map((assignment, index) => {
					return (
						<div key={index}>
							{console.log(assignment)}
							<Paper className={classes.paperBorder} elevation={3}>
								<Grid container spacing={2}>
									<Grid item xs={9}>
										<h2
											onClick={() =>
												history.push(
													`/assignment/${params.cid}/${assignment.assignId}`
												)
											}
											style={{ cursor: "pointer" }}
										>
											{assignment.name.toUpperCase()}
										</h2>
									</Grid>
									<Grid item xs={3}>
									<a href = {assignment.path} style = {{textDecoration:"none"}} target="_blank" rel = "noopener noreferrer">	<Button color="primary" variant="outlined">
											ASSIGNED DATE: <br />
											{assignment.istDateTime.split("T")[0]}
											<br />
											{assignment.istDateTime.split("T")[1]}
										</Button></a>
									</Grid>
								</Grid>
							</Paper>
							<br />
						</div>
					);
				})}
		</div>
	);
}
