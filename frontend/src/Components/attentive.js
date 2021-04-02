import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_ENV, {
  cluster: "ap2",
});

function Attentive() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [missed, setMissed] = useState(false);
  const [input, setInput] = useState("");

  const params = useParams();
  console.log(params.batchId);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (input === text) {
      // submit to API
      setMissed(false);
      handleClose();
    }
  };
  useEffect(() => {
    const channel1 = pusher.subscribe(`${params.batchId}`);
    console.log(channel1);
    channel1.bind("chatroom", function (data) {
      setText(data.message);
      setMissed(true);
      setOpen(true);
      var timeLeft = 30;
      var elem = document.getElementById("some_div");

      function countdown() {
        if (timeLeft === -1) {
          console.log(missed);
          clearTimeout(timerId);
          if (missed) {
            setOpen(false);
            alert(
              "You missed the attentiveness check. Be attentive next time!"
            );
          }
        } else {
          elem.innerHTML = timeLeft + " seconds remaining";
          timeLeft--;
        }
      }
      var timerId = setInterval(countdown, 1000);
    });
    console.log(channel1);

    return () => {
      pusher.unsubscribe("channel_attentive");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Attentiveness Check!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please type <b style={{ color: "gold" }}>{text}</b> in the input field
          below.
          <br />
          <div id="some_div"> </div>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter the Text Above"
          fullWidth
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Attentive;
