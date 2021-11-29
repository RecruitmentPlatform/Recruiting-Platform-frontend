import {React, useState, useContext} from "react";
import {Link, useHistory } from "react-router-dom"; //for routing
import { AuthContext } from "../../AuthContext";
import axios from "axios"

import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { gql, useQuery } from '@apollo/client';

const SIGN_UP_CANDIDATE = gql`
  mutation {
    addTodo(email: $email, password: $password) {
      email
      password
    }
  }
`;

// const SIGN_UP_RECRUITER = gql`
//   mutation createRecruiter($email: String!, $password: String!) {
//     addTodo(email: $email, password: $password) {
//       email
//       password
//     }
//   }
// `;

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Signup = () => {

    const [userInput, setUserInput] = useState({"email":"","password":""})
    const [helperMessage, setHelperMessage] = useState("")
    const [signupType, setSignupType] = useState("recruiter");
    const history = useHistory()

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        console.log(userInput)
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
        const userData = response.data
        console.log(userData)
        if (userData.status === "success"){
            sessionStorage.setItem("session_id", userData.session_id)
            history.push("/search")
        }else{
            setHelperMessage(userData.message)
            history.push("/signup")
        }
    }

    const changeType = (e) => {
        if(e.target.name === "recruiter"){
            setSignupType("recruiter");
        }else{
            setSignupType("candidate");
        }
    }

    return (<>
      <Box
        sx={{
          bgcolor: 'background.primary',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Find a Job
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            A description of our recruitment platform that highlights the initial benefits of the app - such as finding a job!
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="100%" sx={{
        bgcolor: 'info.main', pt: 8, pb: 6, }}>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, margin: "0 auto" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a job"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
      <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item md={4}>
                <form className="form" onSubmit={submitHandler}>
                    <h1 className="signup-title">Sign up</h1>
                    <div className="type-container">
                        <button className={signupType === "recruiter" ? "type-container-btn-toggle": "type-container-btn"}
                                name="recruiter"
                                onClick={changeType}>I'm a Recruiter</button>
                        <button className={signupType === "candidate" ? "type-container-btn-toggle": "type-container-btn"}
                                name="candidate"
                                onClick={changeType}>I'm a Job Seeker</button>
                    </div>

                    <div className="form-container-input">
                        <TextField
                            name = "email"
                            required
                            id="outlined-required"
                            label="Email"
                            type="email"
                            variant="outlined"
                            style = {{width: "100%"}}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-container-input">
                        <TextField
                            name = "password"
                            required
                            id="outlined-required"
                            label="Password"
                            variant="outlined"
                            type="password"
                            style = {{width: "100%"}}
                            onChange={inputHandler}
                        />
                    </div>
                    <button className="signup-btn">Sign up</button>
                    <p style={{margin:"5px 0 5px 0", color:"#F32013"}}>{helperMessage}</p>
                    <p style={{margin:"0 0 30px 0"}}>Already have an account? <Link style={{textDecoration:"none"}} to="login">Login</Link></p>
                </form>
              </Grid>
              <Grid item xs>
              </Grid>
            </Grid></>)
}

export default Signup;
