import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./home";
import MovieTiming from "./movieTiming";
class MainComponent extends Component {
 
  render() {
    return (
      <div className="p-0 m-0">
        <Switch>

          <Route
            path="/home/movies/:location"
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/home/movies"
            render={(props) => <Home {...props} />}
          />
          <Route path="/movies/:location/:title/:imdbid" render={(props)=><MovieTiming {...props}/>}/>
          <Redirect from="/" to="/home/movies"/>
        </Switch>
      </div>
    );
  }
}
export default MainComponent;
