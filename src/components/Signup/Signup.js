import {React, useState, useContext} from "react";
import {Link, useHistory } from "react-router-dom"; //for routing
import { AuthContext } from "../../AuthContext";
import axios from "axios"

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Signup = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const [userInput, setUserInput] = useState({"email":"","password":"", "type":"recruiter"})
    const [helperMessage, setHelperMessage] = useState("")
    const [signupType, setSignupType] = useState("recruiter");
    const history = useHistory()

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     const response = await axios.post('http://127.0.0.1:5000/api/signup', userInput);
    //     const userData = response.data
    //     if (userData.status === "success"){
    //         setAuth({...auth, session_id:userData.session_id, type:userData.type})
    //         sessionStorage.setItem("session_id", userData.session_id)
    //         sessionStorage.setItem("type", userData.type)
    //         history.push("/search")
    //     }else{
    //         setHelperMessage(userData.message)
    //         history.push("/signup")
    //     }
    // }

    const submitHandler =(e) => {
        e.preventDefault();
        const userData = {status:"success", session_id:"1234567", type:"recruiter"} //dummy signup
        if (userData.status === "success"){
            setAuth({...auth, session_id:userData.session_id, type:userData.type})
            sessionStorage.setItem("session_id", userData.session_id)
            sessionStorage.setItem("type", userData.type)
            if(userData.type == "recruiter"){
                history.push("/search/candidates")
            }else{
                history.push("/search/jobs")
            }
        }else{
            setHelperMessage(userData.message)
            history.push("/signup")
        }
    }

    const changeType = (e) => {
        setSignupType(e.target.name)
        console.log(e.target.name)
        setUserInput({...userInput, ["type"]:e.target.name});
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
            </Grid>)
}

export default Signup;
