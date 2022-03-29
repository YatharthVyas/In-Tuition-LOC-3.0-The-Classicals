import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
const axios = require("axios");
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  form: {
    borderRadius: "10px",
    boxShadow:
      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "20px",
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  console.log(props.match.params.cid, props.match.params.id);
  const [assignments, setAssignments] = useState(null);

  const [studentMarks, setStudentMarks] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [studId, setStudId] = React.useState(null);
  const [msg, setMsg] = useState("");
  const handleClickOpen = (sid) => {
    setOpen(true);
    setStudId(sid);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const axios = require("axios");

    let config = {
      method: "get",
      url: `/tutor/responses/?assignId=${props.match.params.id}&batchId=${props.match.params.cid}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setAssignments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitMarks = () => {
    axios
      .post(
        `https://loc-backend-acm.herokuapp.com/tutor/giveFeedback?assignId=${props.match.params.id}&studentId=${studId}`,
        {
          marks: studentMarks,
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log("RESPONSE SENT");
        setMsg("MARKS ENTERED SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        {/* {console.log(submit)} */}
        <h2> Submitted by: </h2>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">View Assignment</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Submit Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments &&
                assignments.submitted.map((row) => (
                  <StyledTableRow
                    key={row.studentId}
                    style={{ cursor: "pointer" }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.studentName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <a href={row.path}>
                        {" "}
                        <Button color="primary" variant="outlined">
                          VIEW
                        </Button>{" "}
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => handleClickOpen(row.studentId)}
                        color="primary"
                        variant="outlined"
                      >
                        {" "}
                        ENTER MARKS
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.istDateTime}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br /> <br />
      <h2> Pending submissions: </h2>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              {/* <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments &&
              assignments.notSubmitted.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.studentName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  {/* <StyledTableCell align="right">
                    {row.istDateTime}
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"PLEASE ENTER THE MARKS"}
        </DialogTitle>
        <DialogContent>
          <div className={classes.form}>
            <form className={classes.container} noValidate>
              <br />
              <br />
              <TextField
                required
                id="standard-required"
                label="Enter Marks"
                value={studentMarks}
                onChange={(e) => setStudentMarks(e.target.value)}
                fullWidth
              />
              <br />
              <br />
            </form>
            <Button variant="contained" color="primary" onClick={submitMarks}>
              SUBMIT
            </Button>
            <br />
            <br />
            <Typography variant="p" style={{ color: "green" }}>
              {msg}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
