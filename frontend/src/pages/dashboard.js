import React,{ useContext } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import image1 from "../../src/1.png";
import image2 from "../../src/2.png";
import image3 from "../../src/3.png";
import image4 from "../../src/4.png";
import image5 from "../../src/5.png";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useHistory } from 'react-router-dom';

import { CustomThemeContext } from '../themes/CustomThemeProvider';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
 
  
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [subData,setSubData] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
 
 const [searchResults, setSearchResults] = React.useState([]);
 
 const handleChange1 = event => {
    setSearchTerm(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    

var color_arr = [
                    "#fa87e1",
                  "#aba4fc",
                  "#f7faa7",
                  "#f58ca2",
                  "#e59ffc",
                  "#fff899",
                  "#b9b3ff",
                  "#b1bdfa",
                  "#f7a1e6",
                  "#fcb290",
                
]

var image_arr = [
    image1,
    image2,
    image3,
    image4,
    image5,
]


  return (
    <div>
      <Grid container spacing={3}
    direction="row"
    justify="flex-start"
    alignItems="center">
        
            
            <Grid item xs={4}></Grid>
            <Grid  item xs={5}>
            {/*<TextField value={searchTerm} onChange={handleChange1} id="outlined-basic" label="Search" variant="outlined" />*/}
            
            </Grid>
            <Grid className='icons' item xs={3}>
            </Grid>
        </Grid><br />
  <Grid container spacing = {2}>

    {subData.map((item) => {
        return(
<Grid item xs = {4}>
<a style = {{textDecoration:"none"}} href={`/teachclassroom/${item._id}`} target="_blank" rel = "noopener noreferrer">  <Paper elevation = {3} style = {{height:"300px",borderRadius:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
          <div style = {{height:"60%",backgroundColor:color_arr[item.info.subject.length%10],borderRadius:"10px",paddingLeft:"10px",paddingRight:"10px"}}>
<Grid container spacing = {2}>
    <Grid item xs = {8}>
<h1 style = {{color:"white"}}>{item.info.subject}</h1>
    </Grid>
    <Grid item xs = {4}>
    <img  src = {image_arr[item.info.subject.length%5]} style = {{height:"120px",marginTop:"10px"}} />
    </Grid>
</Grid>


</div>   
<h1 style = {{marginLeft:"10px"}}>{item.info.tutor}</h1>  
          </Paper></a>
      </Grid>
        )
        
    })}
      
    
    
  </Grid><br />
 

     
        </div>
   
  );
}