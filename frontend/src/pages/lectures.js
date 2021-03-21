import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { isPromise } from "formik";

const axios = require('axios');

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
=======
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
	container: {},
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
		padding: "40px",
	},
>>>>>>> 67c8206d7ca49b53e200be424b032c1537048e62
}));

export default function Lectures() {
	const params = useParams();
	console.log(params.cid);

<<<<<<< HEAD
  const classes = useStyles();
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [lecs,setLecs] = useState([]);
  const [open, setOpen] = React.useState(false);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
=======
	const classes = useStyles();
	const [name, setName] = useState("");
	const [dateTime, setDateTime] = useState(new Date().toISOString());
>>>>>>> 67c8206d7ca49b53e200be424b032c1537048e62

	useEffect(() => {
		axios
			.get(
				"https://virtualclassloc.herokuapp.com/tutor/lectures?batchId=6055ffd23db91e00041a6930"
			)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const submitHandle = (e) => {
		e.preventDefault();
		console.log("IN");
		// if (proceed) {
		console.log(dateTime);
		// uploadToFirebaseStorage();

<<<<<<< HEAD
    axios.get("https://virtualclassloc.herokuapp.com/tutor/lectures?batchId=6055f18d109fae0004b682d0"
   
    ).then((response) => {

        
        setLecs(response.data);
       
       

    })
    .catch((err) => {
        console.log(err);
    })
  },[])

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
		let batchId = "6055f18d109fae0004b682d0";
		assignment.batchId = batchId;
		assignment.name = name;
		assignment.date = utcDate;
		assignment.time = utcTime;
		
		
        assignment.istDateTime = istDateTime;
    console.log("ASSIGN", assignment);

    axios.post("https://virtualclassloc.herokuapp.com/tutor/schedule-lec",
    {
        batchId:assignment.batchId,
        date:assignment.date,
        time:assignment.time,
        name:assignment.name,
        istDateTime:assignment.istDateTime,
        link:"http://localhost:5500/room/1480da40-89ca-11eb-8699-3b390b833ad5",
    }
   
    ).then((response) => {

        console.log(response.data);
        console.log("RESPONSE SENT");
        setOpen(true);
       

    })
    .catch((err) => {
        console.log(err);
    })

    
  };

  return (
    <div>
       {localStorage.getItem("isStudent") == "false" ? 
       <form  onSubmit = {submitHandle} className={classes.container} noValidate>
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
      
      <input type = "submit" value = "SCHEDULE" /> 
     </form>
       :
       <form style = {{visibility:"hidden"}} className={classes.container} noValidate>
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
       }
       <br />

      {lecs && lecs.map((item) => {
 return(   
    <div>     
 
<Paper className={classes.paperBorder} elevation={3}>
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<h2>{item.name}</h2>
							</Grid>
							<Grid item xs={3}>
                            <a href = {item.link} style = {{textDecoration:"none"}} target="_blank" rel = "noopener noreferrer">
									<Button color="primary" variant="outlined">
										JOIN HERE
									</Button>
								</a>
							</Grid>
						</Grid>
					</Paper>
    <br />
    </div>
 )
      })} 
     
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Lecture scheduled successfully!
        </Alert>
      </Snackbar>
      
    </div>
  );
=======
		let a = new Date(dateTime).toISOString();
		console.log(a);
		let utcDate = a.substring(0, 10);
		let utcTime = a.substring(11, 16);
		console.log(utcDate);
		console.log(utcTime);
		let b = dateTime.toString();
		let istDateTime = b.substring(0, 21);
		console.log(istDateTime);
		var dt = istDateTime.split("T");
		let assignment = {};
		let batchId = "6055f18d109fae0004b682d0";
		assignment.batchId = batchId;
		assignment.name = name;
		assignment.date = dt[0];
		assignment.time = dt[1];
		assignment.istDateTime = istDateTime;
		console.log("ASSIGN", assignment);

		axios
			.post("https://virtualclassloc.herokuapp.com/tutor/schedule-lec", {
				batchId: assignment.batchId,
				date: assignment.date,
				time: assignment.time,
				name: assignment.name,
				link: "http://localhost:5500/room/1480da40-89ca-11eb-8699-3b390b833ad5",
			})
			.then((response) => {
				console.log(response.data);
				console.log("RESPONSE SENT");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={classes.paperBorder}>
			{localStorage.getItem("isStudent") == "false" ? (
				<form onSubmit={submitHandle} className={classes.container} noValidate>
					<TextField
						required
						fullWidth
						required
						id="standard-required"
						label="Required"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<br />
					<br />
					<TextField
						id="datetime-local"
						label="Next Lecture"
						type="datetime-local"
						// defaultValue="2017-05-24T10:30"
						value={dateTime}
						fullWidth
						required
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

					<input
						style={{ padding: 10, width: 400 }}
						type="submit"
						value="SCHEDULE"
					/>
				</form>
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
		</div>
	);
>>>>>>> 67c8206d7ca49b53e200be424b032c1537048e62
}


