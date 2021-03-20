import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "../Components/firebase";
import "firebase/storage";
import "firebase/database";
import { scheduleAssignment, getAssignment } from "./helper";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
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
}));

export default function Assignment() {
  const params = useParams();
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
  const onSubmit = () => {
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
    console.log(istDateTime);
    let assignment = {};
    let batchId = "6055f18d109fae0004b682d0";
    assignment.batchId = batchId;
    assignment.name = name;
    assignment.date = utcDate;
    assignment.time = utcTime;
    assignment.istDateTime = istDateTime;
    assignment.path = pathFire;
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
      <form className={classes.container} noValidate>
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
      </form>
      {assignments &&
        assignments.map((assignment, index) => {
          return (
            <div key={index}>
              {console.log(assignment)}
              <h1>{assignment.name}</h1>
            </div>
          );
        })}
    </div>
  );
}