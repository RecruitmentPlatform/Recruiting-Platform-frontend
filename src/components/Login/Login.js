import {React, useState} from "react";
import TextField from '@mui/material/TextField';
import {Link, useHistory } from "react-router-dom";
import axios from "axios"
import Grid from '@mui/material/Grid';

const Login = () => {

    const [userInput, setUserInput] = useState({"email":"","password":"", "type":"recruiter"})
    const [signupType, setSignupType] = useState("recruiter");
    const [helperMessage, setHelperMessage] = useState("")
    const history = useHistory();

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const submitHandler = async (e) => {
        const response = await axios.post('http://127.0.0.1:5000/api/login', userInput);
        const userData = await response.data
        if (userData.status === "success"){
            sessionStorage.setItem("session_id", userData.session_id)
            history.push("/search");
        }else{
            setHelperMessage("Invalid credentials")
            history.push("/login");
        }
    }

    const changeType = (e) => {
        setSignupType(e.target.name)
        setUserInput({...userInput, ["type"]:e.target.name});
    }

    return (<Grid container>
        <Grid item xs>
        </Grid>
        <Grid item md={4}>
          <form className="form" onSubmit={submitHandler}>
              <h1 className="login-title">Login</h1>
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
              <button className="login-btn" onClick={submitHandler}>Login</button>
              <p style={{margin:"5px 0 5px 0", color:"#F32013"}}>{helperMessage}</p>
              <p style={{margin:"0 0 30px 0"}}>Do you have an account yet? <Link style={{textDecoration:"none"}}
                                                                                   to="signup">Signup</Link></p>
          </form>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>)
    
    
    
    
    

}

export default Login;
