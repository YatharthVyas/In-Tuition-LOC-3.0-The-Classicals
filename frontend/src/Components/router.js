import React from "react";
import Home from "../pages/home";
import Navbar from "./navbar";
import Footer from "./footer";
import Whiteboard from "../pages/whiteboard.js";
import AddClassroom from "../pages/addClass.js";
import Login from "../pages/login.js";
import Signup from "../pages/signup.js";
import VideoConf from "./VideoConf.js";
import Chatbot from "../Components/chatbot.js";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";

function ProtectedRoutes() {
	return localStorage.getItem("userId") ? (
		<div>
			<Route exact path="/video-conf" component={VideoConf} />
			<Route exact path="/whiteboard" component={Whiteboard} />
			<Route exact path="/class/add" component={AddClassroom} />
			<Route exact path="/doubts" components={Chatbot} />
		</div>
	) : (
		<Redirect to="/" />
	);
}

function RootRouter() {
	//const invalidRoute = () => <Redirect to='/' />; //This will send user back to homepage

	return (
		<Router>
			<div id="page-container">
				<Navbar />
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route component={ProtectedRoutes} />
					</Switch>
				</div>
			</div>
			<footer id="footer">
				<Footer />
			</footer>
		</Router>
	);
}

export default RootRouter;
