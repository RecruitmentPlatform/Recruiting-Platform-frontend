import {React, useState} from "react";
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
import {Link, useHistory } from "react-router-dom"; //for routing
import axios from "axios"
=======
import { Link  } from "react-router-dom"; //for routing
import Grid from '@mui/material/Grid';
>>>>>>> 111bb71ab98803f05167bab04e4d8e804222c44f

const Signup = () => {

    const [userInput, setUserInput] = useState({"username":"", "email":"","password":""})
    const [helperMessage, setHelperMessage] = useState("")
    const [signupType, setSignupType] = useState("recruiter");
    const history = useHistory()

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
        const userData = response.data
        console.log(userData)
        if (userData.status === "success"){
            sessionStorage.setItem("session_id", userData.session_id)
            history.push("/")
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

    return (<Grid container>
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
                            name = "username"
                            required
                            id="outlined-required"
                            label="Username"
                            variant="outlined"
                            style = {{width: "100%"}}
                            onChange={inputHandler} 
                        />
                    </div>
                    <div className="form-container-input">
                        <TextField
                            name = "email"
                            required
                            id="outlined-required"
                            label="Email"
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
            </Grid>)
}

export default Signup;
