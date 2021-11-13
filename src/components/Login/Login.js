import {React, useState} from "react";
import TextField from '@mui/material/TextField';
import {Link, useHistory } from "react-router-dom";
import axios from "axios"

const Login = () => {
    //const [loginType, setLoginType] = useState("recruiter");

    // const changeType = (e) => {
    //     if(e.target.name === "recruiter"){
    //         setLoginType("recruiter");
    //     }else{
    //         setLoginType("candidate");
    //     }
    // }

    const [userInput, setUserInput] = useState({"email":"","password":""})
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

    return (<div className="login-page">
    <div className="form-container-login">
        <div className="form">
        <h1 className="login-title">Login</h1>
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
            <p style={{margin:"18px 0 10px 0", color:"#F32013"}}>{helperMessage}</p>
            <p style={{margin:"20px 0 10px 0"}}>Do you have an account yet?  <Link style={{textDecoration:"none"}}
                                                                                   to="signup">Signup</Link></p>
        </div>
    </div>
    </div>)
}

export default Login;
