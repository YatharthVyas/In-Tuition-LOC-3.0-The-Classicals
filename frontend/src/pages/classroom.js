import React,{ useContext } from 'react';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Whiteboard from "./whiteboard";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MCQ from "./mcq";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { useHistory } from 'react-router-dom';

import { CustomThemeContext } from '../themes/CustomThemeProvider';
import axios from 'axios';

const drawerWidth = 240;



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
    },
  }));
  
export default function PersistentDrawerLeft() {
 

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  const [subData,setSubData] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
 
 const [searchResults, setSearchResults] = React.useState([]);
 const [testOpen,setTestOpen] = React.useState(0);
 
 const params = useParams();
 console.log(params.cid);
 
 

  var subject_data = [
    {title:"MACHINE LEARNING",teacher:"Prof K. Sharma"},
    {title:"DATA MINING",teacher:"Prof K. Sharma"},
    {title:"COMPILERS",teacher:"Prof K. Sharma"},
    {title:"APPLIED MATHS",teacher:"Prof K. Sharma"},
    {title:"WEB DEV",teacher:"Prof K. Sharma"},
    {title:"APPLIED PHYSICS",teacher:"Prof K. Sharma"}
]

  React.useEffect(() => {

    
        const results = subject_data.filter((sub) =>
          sub.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
        setSearchResults(results);
      
    
      }, [searchTerm]);
      console.log(localStorage.getItem("isStudent"));

React.useEffect(() => {

    axios.get(`https://virtualclassloc.herokuapp.com/tutor/mybatches/?tutorId=${localStorage.getItem("userId")}`
   
    ).then((response) => {

        console.log(response.data);
        setSubData(response.data);

    })
    .catch((err) => {
        console.log(err);
    })

},[])
    
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
   
 
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendId = () => {
      setOpen(false);
      setTestOpen(1);
  }



  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab style = {{paddingLeft:"30px"}} label="Whiteboard" {...a11yProps(0)} />
          <Tab label="Lecture" {...a11yProps(1)} />
          <Tab label="Assignments" {...a11yProps(2)} />
          <Tab label="Tests" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel style = {{marginTop:"20px"}} value={value} index={0} dir={theme.direction}>
        Whiteboard
        </TabPanel>
        <TabPanel style = {{marginTop:"20px"}} value={value} index={1} dir={theme.direction}>
        <a href = "http://localhost:5500/room/eb61b1b0-89bb-11eb-825e-61471acf75a9" target="_blank" rel = "noopener noreferrer"><button >Video Conferencing</button></a>
        </TabPanel>
        <TabPanel style = {{marginTop:"20px"}} value={value} index={2} dir={theme.direction}>
        
        </TabPanel>
        <TabPanel style = {{marginTop:"20px"}} value={value} index={3} dir={theme.direction}>
        {testOpen == 1?
        <div>
             MCQ TEST
          <MCQ />
        
        </div>
    :
    <Paper style = {{height:"130px"}} elevation = {3}>
        <Button style = {{marginLeft:"10px"}} variant="outlined" color="primary"  onClick={() => handleClickOpen()}>
       ATTEMPT TEST
      </Button>
    </Paper>    
    }
        </TabPanel>
      </SwipeableViews>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to attempt the test?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendId} color="primary">
           <p id = "Sid"> Yes </p>
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
           No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}