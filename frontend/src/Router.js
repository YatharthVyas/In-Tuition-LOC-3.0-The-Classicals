import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import WhiteBoard from './Components/WhiteBoard';
import VideoConf from './Components/VideoConf';


class RootRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WhiteBoard} />
          <Route exact path="/video-conf" component={VideoConf} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RootRouter;