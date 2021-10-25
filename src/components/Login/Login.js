import {React, useState} from "react";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

const Login = () => {
    const [loginType, setLoginType] = useState("recruiter");

    const changeType = (e) => {
        if(e.target.name === "recruiter"){
            setLoginType("recruiter");
        }else{
            setLoginType("candidate");
        }
    }

    return (<div className="login-page">
    <div className="form-container-login">
        <div className="form">
        <h1 className="login-title">Login</h1>
            <div className="form-container-input">
                <TextField
                    name = "username"
                    required
                    id="outlined-required"
                    label="Username"
                    variant="outlined"
                    style = {{width: "100%"}}
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
                />
            </div>
            <button className="login-btn" >Login</button>
            <p style={{margin:"18px 0 10px 0", color:"#F32013"}}></p>
            <p style={{margin:"20px 0 10px 0"}}>Do you have an account yet?  <Link style={{textDecoration:"none"}}
                                                                                   to="signup">Signup</Link></p>
        </div>
    </div>
    </div>)
}

export default Login;
