import React,{ useContext } from 'react';
import Home from "../pages/home";
import Navbar from "./navbar";
import Footer from "./footer";
import Whiteboard from "../pages/whiteboard.js";
import Dashboard from "../pages/dashboard.js";
import AddClassroom from "../pages/addClass.js";
import Login from "../pages/login.js";
import Signup from "../pages/signup.js";
import VideoConf from "./VideoConf.js";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { CustomThemeContext } from '../themes/CustomThemeProvider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      padding: 5,
	 
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleBar: {
    flexGrow: 1,
},
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: 30,
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("drawer",open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
console.log("Name" + localStorage.getItem("name"))
  const history = useHistory();
	const { currentTheme, setTheme } = useContext(CustomThemeContext);
	const handleThemeChange = (event) => {
		if(currentTheme === 'normal') {
			setTheme('dark');
		} else {
			setTheme('normal');
		}
	};

	function ProtectedRoutes() {
		return localStorage.getItem("userId") ? (
			<div>
				<Route exact path="/video-conf" component={VideoConf} />
				<Route exact path="/whiteboard" component={Whiteboard} />
				<Route exact path="/class/add" component={AddClassroom} />
				<Route exact path="/dashboard" component={Dashboard} />
			</div>
		) : (
			<Redirect to="/" />
		);
	}

  return (
    <div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
      color='secondary'
        position="fixed"
        id='navbarCustomId'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={
            currentTheme === 'dark'
              ? {
                  boxShadow:
                    '0px 4px 6px -1px rgba(255,255,255,0.3), 0px 4px 5px 0px rgba(255,255,255,0.24), 0px 1px 10px 0px rgba(255,255,255,0.22)',
                }
              : null
          }
      >
        <Toolbar>
		
		
		<IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
		
          <div className={classes.titleBar}>
          <Typography
              color='primary'
              component='span'
              onClick={() => history.push('/')}
              className={classes.title}
            >
              LOC Project
            </Typography>
            </div>
            <IconButton
            onClick={handleThemeChange}
            id='themeBtn'
           
          >
            <img
              style={currentTheme === 'dark' ? { filter: 'invert(1)' } : null}
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3WvUodQRQH8J969YIiBlIJPoEPoA8gWAliYgLiLbXyo/Gjip0vYGGRh0hhSBVI0kUuhiRdqkQtRFBQxMpbpdgRr+Dunf0AQfzDYWd35/z/M2fOmRmeEY+JYIVQKyH8Njy/FHHuLiFcClnCPRXwp3KkCddwjkYGaStYGho4U2A5G7jJEB8KVsQ3Wnw2h8+bsqLtRPOhXcMivknCeIavWHAX0vmYgXblGMAwPuIldnEQvo9hSZIT0zjNwdkRdfzEHvof+N8fBvUDfVUKr+Bfimi7+JFk9pWhibWIfhvYjyFsr7FJvG57b+EdrjDqbk2zcICt0B7Ctvuh/4DP5Nsy8yRiZWhiPaLfpshQx2IVh7KTawDHWK5SuI7fkpJ5SHwAn/BLZDnlWbeRQP5CsoE0g/+4pIQuMIWTHJyZeIW50K5Lanof18G+S8J7O9M5zJQVLXJIzKroZEojGAxWxDcVvbjs4LgTLA2NwNGbV7xTdr4PVogja+fKutbEIpXj0W6ZZW6SLfzB34rG8sTxHxQCSoItZf48AAAAAElFTkSuQmCC'
              alt='change theme icon'
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]:open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Router>
      <div id='page-container'>
        
        
         
		  <Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/signup" component={Signup} />
		<Route component={ProtectedRoutes} />
		</Switch>
      
      </div>
      </Router>
     
    
      </main>
      
    </div>
     <footer id='footer'>
     <Footer />
   </footer>
   </div>
  );



}





