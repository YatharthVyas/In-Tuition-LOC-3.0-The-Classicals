import React, { useContext } from "react";
import { CustomThemeContext } from "../themes/CustomThemeProvider";
// MuI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	titleBar: {
		flexGrow: 1,
	},
	title: {
		fontWeight: 800,
		cursor: "pointer",
		fontSize: 30,
	},
	navbar: {
		padding: 5,
	},
	list: {
		width: 250,
	  },
	  fullList: {
		width: 'auto',
	  },
	info: {
		marginTop: 2,
	},
}));

function Navbar() {
	const classes = useStyles();
	const history = useHistory();
	const { currentTheme, setTheme } = useContext(CustomThemeContext);
	const [state, setState] = React.useState({
		top: false,
	
	  });

	  var arr = [];

	  if(localStorage.getItem("isStudent") === "true")
	  arr = [{nameVal:"My Batches",direct:"/dashboard"},{nameVal:"Search Batches",direct:"/search"},{nameVal:"Assignments",direct:"/dashboard"},{nameVal:"Doubts",direct:"/dashboard"}]
	  else
	  arr = [{nameVal:"My Batches",direct:"/dashboard"},{nameVal:"Calendar",direct:"/dashboard"},{nameVal:"Doubts",direct:"/dashboard"}]
	  
	  const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}
	
		setState({ ...state, [anchor]: open });
	  };
	
	  const list = (anchor) => (
		<div
		  className={clsx(classes.list, {
			[classes.fullList]: anchor === 'top' || anchor === 'bottom',
		  })}
		  role="presentation"
		  onClick={toggleDrawer(anchor, false)}
		  onKeyDown={toggleDrawer(anchor, false)}
		>
		  <List>
			{arr.map((text, index) => (
			  <a style = {{textDecoration:"none"}} href = {text.direct} ><ListItem button key={text.nameVal}>
				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
				<ListItemText primary={text.nameVal} />
			  </ListItem></a>
			))}
		  </List>
		 
		</div>
	  );
	const handleThemeChange = (event) => {
		if (currentTheme === "normal") {
			setTheme("dark");
		} else {
			setTheme("normal");
		}
	};

	return (
		<div className={classes.root}>
			<AppBar
				color="secondary"
				position="static"
				id="navbarCustomId"
				className={classes.navbar}
				style={
					currentTheme === "dark"
						? {
								boxShadow:
									"0px 4px 6px -1px rgba(255,255,255,0.3), 0px 4px 5px 0px rgba(255,255,255,0.24), 0px 1px 10px 0px rgba(255,255,255,0.22)",
						  }
						: null
				}
			>
				<Toolbar>
					<div className={classes.titleBar}>
					<MenuIcon color = "primary"  style = {{marginRight:"10px",cursor:"pointer"}} onClick={toggleDrawer("left", true)} />
						<Typography
							color="primary"
							component="span"
							onClick={() => history.push("/")}
							className={classes.title}
						>
							LOC Project
						</Typography>
					</div>

					<IconButton
						onClick={handleThemeChange}
						id="themeBtn"
						style={{ marginRight: -20, outline: "none !important" }}
					>
						<img
							style={currentTheme === "dark" ? { filter: "invert(1)" } : null}
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3WvUodQRQH8J969YIiBlIJPoEPoA8gWAliYgLiLbXyo/Gjip0vYGGRh0hhSBVI0kUuhiRdqkQtRFBQxMpbpdgRr+Dunf0AQfzDYWd35/z/M2fOmRmeEY+JYIVQKyH8Njy/FHHuLiFcClnCPRXwp3KkCddwjkYGaStYGho4U2A5G7jJEB8KVsQ3Wnw2h8+bsqLtRPOhXcMivknCeIavWHAX0vmYgXblGMAwPuIldnEQvo9hSZIT0zjNwdkRdfzEHvof+N8fBvUDfVUKr+Bfimi7+JFk9pWhibWIfhvYjyFsr7FJvG57b+EdrjDqbk2zcICt0B7Ctvuh/4DP5Nsy8yRiZWhiPaLfpshQx2IVh7KTawDHWK5SuI7fkpJ5SHwAn/BLZDnlWbeRQP5CsoE0g/+4pIQuMIWTHJyZeIW50K5Lanof18G+S8J7O9M5zJQVLXJIzKroZEojGAxWxDcVvbjs4LgTLA2NwNGbV7xTdr4PVogja+fKutbEIpXj0W6ZZW6SLfzB34rG8sTxHxQCSoItZf48AAAAAElFTkSuQmCC"
							alt="change theme icon"
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<React.Fragment key={"left"}>
          
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
		</div>
	);
}

export default Navbar;
