import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { isPromise } from "formik";
import { Typography } from "@material-ui/core";

const axios = require("axios");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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
}));

export default function Lectures() {
  const params = useParams();
  console.log(params.cid);

  const classes = useStyles();
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [lecs, setLecs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://loc-backend-acm.herokuapp.com/tutor/lectures?batchId=${params.cid}`
      )
      .then((response) => {
        console.log(response.data);
        setLecs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(lecs);
  const submitHandle = (e) => {
    e.preventDefault();
    console.log("IN");
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
    let batchId = params.cid;
    assignment.batchId = batchId;
    assignment.name = name;
    assignment.date = utcDate;
    assignment.time = utcTime;

    assignment.istDateTime = istDateTime;
    console.log("ASSIGN", assignment);

    axios
      .post("https://loc-backend-acm.herokuapp.com/tutor/schedule-lec", {
        batchId: assignment.batchId,
        date: assignment.date,
        time: assignment.time,
        name: assignment.name,
        istDateTime: assignment.istDateTime,
        link: "http://localhost:5500/room/1480da40-89ca-11eb-8699-3b390b833ad5",
      })
      .then((response) => {
        console.log(response.data);
        console.log("RESPONSE SENT");
        setMsg("LECTURE SCHEDULED SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {localStorage.getItem("isStudent") == "false" ? (
        <div>
          <form
            onSubmit={submitHandle}
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
              label="Next Lecture"
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
            <input type="submit" value="SCHEDULE" /> <br />
          </form>
          <br />
          <Typography variant="h8" style={{ color: "green" }}>
            {msg}
          </Typography>
        </div>
      ) : (
        <form
          style={{ visibility: "hidden" }}
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
        </form>
      )}
      <br />

      {lecs &&
        lecs.map((item) => {
          return (
            <div>
              <Paper className={classes.paperBorder} elevation={3}>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <h2>{item.name}</h2>
                  </Grid>
                  <Grid item xs={3}>
                    <a
                      href={item.link}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button color="primary" variant="outlined">
                        JOIN HERE
                        <br />
                        {item.time.split("T")[0]} <br />
                        {item.time.split("T")[1]}
                      </Button>
                    </a>
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
