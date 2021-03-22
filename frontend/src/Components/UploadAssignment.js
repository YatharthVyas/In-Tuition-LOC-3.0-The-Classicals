import React, { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import { sendResponse } from "./helper";
import firebase from "../Components/firebase";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "firebase/storage";
import { Typography } from "@material-ui/core";

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

const StudentResponse = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState(null);
  const classes = useStyles();
  const params = useParams();
  const assignId = params.assignId;

  const uploadToFirebaseStorage = async (e) => {
    const file = e.target.files[0];
    const id = localStorage.getItem("userId");
    const storageRef = firebase
      .storage()
      .ref(`Responses`)
      .child(assignId)
      .child(id);
    storageRef.put(file).then(() => {
      storageRef
        .getDownloadURL()
        .then(async (url) => {
          // imageRef.set(url);
          // onSubmit(url);
          setPath(url);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const onSubmit = () => {
    console.log(path);
    let date = new Date();
    let b = date.toString();
    let submitDateTime = b.substring(0, 21);
    console.log(submitDateTime);
    let response = {};
    response.name = name;
    response.istDateTime = submitDateTime;
    response.path = path;
    response.assignId = assignId;
    response.studentId = localStorage.getItem("userId");
    console.log("ASSIGN", response);
    sendResponse(response).then(() => {
      // navigation.goBack();
      console.log("SUCCESS");
    });
  };

  useEffect(() => {
   
  }, []);
  console.log(useLocation().state.detail);
  console.log(useLocation().state.complete);
  var comp = useLocation().state.complete;
  return (
    <div>
      
     

      <Typography variant = "h4" color = "primary"><strong>UPLOAD RESPONSE</strong></Typography>
      

  <br />
<div className={classes.form}>
          <form className={classes.container} noValidate>
          {useLocation().state.detail == 0 ? 
      <Typography variant = "h4" style = {{color:"red"}}>Sorry, the current assignment is not accepting responses as the deadline has passed!!</Typography>
      :
      comp == false ?
      null
      :
      <Typography variant = "h4" style = {{color:"green"}}>You have already submitted the Assignment!</Typography>
      }
            <br />
            <br />
            <TextField
              required
              id="standard-required"
              label="Name Of File"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
            />
           
      <br />
      <br />
    
            {/* <input type="file" onChange={uploadToFirebaseStorage} /> */}
            <TextField type="file" onChange={uploadToFirebaseStorage} />
            {/* Keep this submit button as dummy */}
            <br /><br />
          </form>
          <div align="center">
           
            {useLocation().state.detail == 0 || comp == true? 
             <Button
             disabled = {true}
             variant="contained"
             color="primary"
             onClick={onSubmit}
             
           >
             Submit
           </Button>
            :
            <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            
          >
            Submit
          </Button>
            }
          </div>
        </div>
  
      
    </div>
  );
};
export default StudentResponse;
