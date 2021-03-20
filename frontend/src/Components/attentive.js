import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_ENV, {
	cluster: "ap2",
});

function Attentive() {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	const [error, setError] = useState("");
	const [input, setInput] = useState("");
	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = () => {
		if (input === text) {
			// submit to API
			handleClose();
		} else {
			setError("Please enter the correct text");
		}
	};
	useEffect(() => {
		const channel1 = pusher.subscribe("channel_attentive");
		channel1.bind("chatroom", function (data) {
			setText(data.message);
			setOpen(true);
		});
		console.log(channel1);

		return () => {
			pusher.unsubscribe("channel_attentive");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Attentiveness Check!</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please type <b style={{ color: "gold" }}>{text}</b> in the input field
					below.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Enter the Text Above"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleSubmit} color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default Attentive;
