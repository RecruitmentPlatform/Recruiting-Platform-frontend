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

import JobCard from "../Card/JobCard";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from '@mui/material/Avatar';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

import { gql, useQuery } from '@apollo/client';

const Homepage = () => {
    const uid = +sessionStorage.getItem("uid");
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

    return (
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
            Begin Searching
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Search for a job or a company.
          </Typography>
          <Card sx={{mb:2}}>
            <CardContent>

            </CardContent>
          </Card>
          <Card sx={{ mb: 2 }}>
            <CardHeader
              sx={{pb:0}}
              avatar={
                <Avatar
                  alt="Ali Connors"
                  src="https://mui.com/static/images/avatar/3.jpg"
                />
              }
              title={"Ali Connors"}
              subheader={"5 hours ago"}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" component="p" sx={{mb:1}}>
                {
                  "Please check out my job at Google! It has amazing benefits!"
                }
              </Typography>
                <JobCard
                  key = "0"
                  title = "Software Engineer L3"
                  description="Join the software engineering team at Facebook and work on..."
                  company = "Facebook" />
            </CardContent>
          </Card>
        </Container>
      </Box>)
}

export default Homepage;
