import React from "react";
import TextField from '@mui/material/TextField';
import { Link  } from "react-router-dom"; //for routing

const Signup = () => {

    return (<div className="signup-page">
            <div className="form-container-signup">
                <form className="form" >
                <h1 className="signup-title">Sign up</h1>
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
                            name = "email"
                            required
                            id="outlined-required"
                            label="Email"
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
                    <button className="signup-btn">Sign up</button>
                    <p style={{margin:"15px 0 15px 0", color:"#F32013"}}></p>
                    <p style={{margin:"0 0 30px 0"}}>Already have an account?  <Link style={{textDecoration:"none"}} to="login">Login</Link></p>
                </form>
            </div>
            </div>) 
}

export default Signup;