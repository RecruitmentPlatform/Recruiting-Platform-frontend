import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; 

//import components from /components
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import CandidateRegistration from "./components/CandidateRegistration/CandidateRegistration";

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Router> 
      <Switch>
        <Route path="/" exact component={Signup}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/registration/candidate" exact component={CandidateRegistration}/>
        <Signup/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
