import React from "react";
import Home from "../pages/home";
import Navbar from "./navbar";
import Footer from "./footer";
import Whiteboard from "../pages/whiteboard.js";
import DashboardStudent from "../pages/dashboard_student.js";
import MakeMCQ from "../pages/make_mcq";
import ClassroomTeacher from "../pages/classroom_teacher.js";
import Dashboard from "../pages/dashboard.js";
import Search from "../pages/search.js";
import Classroom from "../pages/classroom.js";
import AddClassroom from "../pages/addClass.js";
import Login from "../pages/login.js";
import Doubts from "../pages/doubts.js";
import Signup from "../pages/signup.js";
import VideoConf from "./VideoConf.js";
import AssignmentPage from "../pages/assignmentPage.js";
import Chatbot from "../Components/chatbot.js";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Assignment from "./Assignment";
import UploadAssignment from "./UploadAssignment";

function ProtectedRoutes() {
  return localStorage.getItem("userId") ? (
    <div>
      {localStorage.getItem("isStudent") === "true" && <Chatbot />}
      <Route exact path="/doubts" component={Doubts} />
      <Route exact path="/video-conf" component={VideoConf} />
      <Route exact path="/whiteboard/:batchId" component={Whiteboard} />
      <Route exact path="/class/add" component={AddClassroom} />
      {localStorage.getItem("isStudent") === "true" ? (
        <Route exact path="/dashboard" component={DashboardStudent} />
      ) : (
        <Route exact path="/dashboard" component={Dashboard} />
      )}

      <Route exact path="/search" component={Search} />
      <Route exact path="/makemcq" component={MakeMCQ} />
      <Route exact path="/classroom/:cid" component={Classroom} />
      <Route exact path="/teachclassroom/:cid" component={ClassroomTeacher} />
      <Route exact path="/upload/:assignId" component={UploadAssignment} />
      <Route
        exact
        path="/assignment/:cid/:id"
        render={(props) => {
          return <AssignmentPage {...props} />;
        }}
      />
      <Chatbot />
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