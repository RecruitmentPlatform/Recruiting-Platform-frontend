import React from "react";
//import Container from '@mui/material/Container';
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

import Jobs from "./components/Search/Jobs";
import Candidates from "./components/Search/Candidates";
import Recruiters from "./components/Search/Recruiters";
import Companies from "./components/Search/Companies";
import InterviewProcess from "./components/InterviewProcess/InterviewProcess";

import CandidateRegistration from "./components/CandidateRegistration/CandidateRegistration";

function App() {
  return (
    <div className="App">
    {/* <Navbar/> */} 
    {/* <Container> */}
    <Router>
    <Navbar/>
      <Switch>
        <Route path="/" exact component={Signup}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/search/jobs" exact component={Jobs}/>
        <Route path="/search/candidates" exact component={Candidates}/>
        <Route path="/search/recruiters" exact component={Recruiters}/>
        <Route path="/search/companies" exact component={Companies}/>
        <Route path="/search" exact component={Jobs}/>
        <Route path="/registration/candidate" exact component={CandidateRegistration}/>
        <Route path="/interview/process" exact component={InterviewProcess}/>
        <Signup/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
