import {React, useState} from "react";
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

import Candidate from "./components/Candidate/Candidate";
import Job from "./components/Job/Job";
import UpdateCandidate from "./components/CandidateRegistration/CandidateRegistration";
import Sidebar from "./components/Navbar/Sidebar";

import {AuthContext} from "./AuthContext";

function App() {

  const [auth, setAuth] = useState(sessionStorage.getItem("session_id"))
  
  if(auth){
    return (
    <div className="App">
      <Router>
      <AuthContext.Provider value={{auth:auth, setAuth:setAuth}}>  
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
          <Route path="/registration/candidate" exact component={UpdateCandidate}/>
          <Route path="/interview/process" exact component={InterviewProcess}/>
          <Route path="/search/candidate" exact component={Candidate}/>
          <Route path="/search/job" exact component={Job}/>
          {/* <Route path="/search/recruiter" exact component={Recruiter}/> */}
          <Signup/>
        </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  )}else{
    return (
      <div className="App">
        <Router>
        <AuthContext.Provider value={{auth:auth, setAuth:setAuth}}>  
        <Navbar/>
          <Switch>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/" component={Signup}/>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
    )
  }
}

export default App;
