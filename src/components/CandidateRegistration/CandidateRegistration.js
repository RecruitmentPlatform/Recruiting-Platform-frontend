import {React, useState} from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from '@apollo/client';
//import {Link} from "react-router-dom";
//import TextField from '@mui/material/TextField';


const UPDATE_CANDIDATE = gql`
    mutation UpdateCandidate($id:Int!, $first:String!,$last:String!,$email:String!, $phone:String!, $description:String!) {
        updateCandidate(id:$id, first:$first, last: $last, email: $email, phone: $phone, description: $description) {
            first
            last
            email
            description
            }}`;

const UpdateCandidate = () =>{

    const [userInput, setUserInput] = useState({"first":"","last":"","email":"","phone":"","description":""})
    const history = useHistory()

    const inputHandler = (e) => {
        const key = e.target.name;
        setUserInput({...userInput, [key]:e.target.value});
    }

    const [updateCandidate, { data, loading, error }] = useMutation(UPDATE_CANDIDATE);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
      <div className="candidate-registration-container">
        <h1>Registration</h1>
        <form onSubmit={() => { updateCandidate(
          {variables: {
                id: 1,
                first:userInput.first,
                last:userInput.last,
                email:userInput.email,
                phone:userInput.phone,
                description:userInput.description}
              })
          .then(history.push("/search/jobs"))}
        }>
        <div className="candidate-registration-name-flex">
            <div>
                <p>First Name</p>
                <input name="first" onChange={inputHandler} required/>
            </div>
            <div>
            <p>Last Name</p>
                <input name="last" onChange={inputHandler} required/>
            </div>
        </div>
        <div className="candidate-registration-info">
            <p>Email</p>
            <input name="email" onChange={inputHandler} required/>
            <p>Phone</p>
            <input name="phone" onChange={inputHandler} required/>
            <p>Description</p>
            <textarea className="candidate-registration-textarea"
                      name="description" onChange={inputHandler} required>
            </textarea>
        </div>
        <div className="candidate-registration-button-container">
            {/* <button className="candidate-registration-btn"
                    onClick={() => {

                        updateCandidate({variables:{id: 1, first:userInput.first, last:userInput.last,
                                         email:userInput.email, phone:userInput.phone, description:userInput.description}}
                                        ).then(history.push("/search/candidates"))
                                    }
                            }
            >REGISTER
            </button> */}
            <button className="candidate-registration-btn">Register</button>

        </div>
                </form>
            </div>)
}

export default UpdateCandidate;
