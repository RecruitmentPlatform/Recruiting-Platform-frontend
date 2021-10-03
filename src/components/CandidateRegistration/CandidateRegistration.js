import React from "react";
import {Link} from "react-router-dom";
import TextField from '@mui/material/TextField';

const CandidateRegistration = () =>{

    return (<div className="candidate-registration-container">
                <h1 >Registration</h1>
                <form>
                    <div className="candidate-registration-name-flex"> 
                        <div>
                            <p>First Name</p>
                            <input/>
                        </div>
                        <div>
                        <p>Last Name</p>
                            <input/>
                        </div>
                    </div>
                    <div className="candidate-registration-info">
                        <p>Email</p>
                        <input/>
                        <p>Phone</p>
                        <input/>
                        <p>Physical Address</p>
                        <input/>
                        <p>Date Of Birth</p>
                        <input type="date" id="start" name="trip-start"
                            value="2021-10-03"
                            min="1910-01-01" max="2021-12-31">
                        </input>
                        <p>Company</p>
                        <input/>
                        <p>Current Role</p>
                        <input/>
                        <p>Salary</p>
                        <input/>
                    </div>
                    <div className="candidate-registration-button-container">
                        <button className="candidate-registration-btn">REGISTER</button>
                    </div>
                </form>       
            </div>)
}

export default CandidateRegistration;