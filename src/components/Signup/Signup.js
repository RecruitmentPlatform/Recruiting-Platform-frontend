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
            inputProps={{ "aria-label": "search for a job" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
      </>)
}

export default Signup;
