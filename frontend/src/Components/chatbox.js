import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import "./chat.css";
import firebase from "./firebase";
import "firebase/database";
var Filter = require("bad-words"),
	filter = new Filter();

function ChatBox() {
	const [input, setInput] = useState("");
	const [anonymous, setAnonymous] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [messages, setMessage] = useState([
		// {
		//   userName: "abc@gmail.com",
		//   userId: "123",
		//   userMessage:
		//     "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aeneanc commodo ligula eget dolor.",
		// },
		// {
		//   userName: "abc@gmail.com",
		//   userId: "123",
		//   userMessage:
		//     "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aeneanc commodo ligula eget dolor.",
		// },
	]);
	useEffect(() => {
		filter.addWords("saala", "kutta", "harami");

		setMessage([]);
		const onChildAdded = firebase
			.database()
			.ref(`Chats`)
			.on("child_added", (snapshot) => {
				let helperArr = [];
				helperArr.push(snapshot.val());
				setMessage((files) => [...files, ...helperArr]);
				console.log(snapshot.val());
			});
		return () =>
			firebase.database().ref("Chats").off("child_added", onChildAdded);
	}, []);
	const userName = localStorage.getItem("name");
	const userId = localStorage.getItem("userId");
	const sendDoubt = () => {
		if (input.trim().length > 0 && filter.clean(input) === input) {
			console.log(filter.clean(input) !== input);
			console.log(input);
			const uniqueKey = firebase.database().ref().push().key;
			firebase.database().ref(`Chats/${uniqueKey}`).update({
				userName: userName,
				userId: userId,
				userMessage: input,
				anonymous: anonymous,
			});
			setInput("");
		} else {
			setShowWarning(true);
			setTimeout(() => {
				setShowWarning(false);
			}, 2000);
		}
	};

	return (
		<div
			id="chatBody"
			style={{
				boxShadow:
					" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
			}}
		>
			<Snackbar
				open={showWarning}
				autoHideDuration={2000}
				onClose={() => setShowWarning(false)}
				style={{ marginBottom: 80 }}
			>
				<Alert variant="filled" severity="error">
					{input.trim().length === 0
						? "Message too short"
						: "Message flagged as Inappropriate"}
				</Alert>
			</Snackbar>
			<main>
				<header>
					<div>
						<h2>Classroom Chat</h2>
					</div>
				</header>
				<ul id="chat">
					{messages.map((item, index) => {
						return (
							<li
								key={index}
								className={
									item.userId === localStorage.getItem("userId") ? "me" : "you"
								}
							>
								<div className="entete">
									<h2>{item.anonymous ? "Anonymous" : item.userName}</h2>
								</div>
								<div className="triangle"></div>
								<div className="message">{item.userMessage}</div>
							</li>
						);
					})}
				</ul>
				<footer style={{ marginRight: 20 }}>
					<TextField
						variant="outlined"
						multiline
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter Doubt"
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={sendDoubt}>
										<SendIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<div align="right" style={{ fontSize: 12 }}>
						<b>Disguise as Anonymous </b>
						<Checkbox
							style={{ marginTop: -5 }}
							value={anonymous}
							size="small"
							color="primary"
							onChange={() => setAnonymous(!anonymous)}
						/>
					</div>
				</footer>
			</main>
		</div>
	);
}

export default ChatBox;
