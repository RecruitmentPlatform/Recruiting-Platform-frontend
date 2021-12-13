import {React, useState, useEffect } from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery } from '@apollo/client';


const GET_CANDIDATE = gql`
  query  Candidate($id:Int!){
            candidate(id:$id){
            id
            first
            last
            email
            phone
            hash
            description
          }
        }
        `;

const Candidate = () => {
    const location = useLocation();
    const id = location.state.id;
    const uid = +sessionStorage.getItem("uid");
    const { loading, error, data } = useQuery(GET_CANDIDATE, {variables:{id}});
    const [isNull, setIsNull] = useState(false);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
            <div className="profile-page-card">
                <h1 className="profile-page-title">{data.candidate.first + " " + data.candidate.last}</h1>
                <div className="profile-page-info">
                    <p>・Email : {data.candidate.email}</p>
                    <p>・Phone: {data.candidate.phone}</p>
                    <p>・Gender: {data.candidate.gender_id}</p>
                    <p>・Pronoun: {data.candidate.gender_pronoun_id}</p>
                    <p>・Ethnicity: {data.candidate.ethnicity_id}</p>
                    <p>・Description: {data.candidate.description}</p>
                </div>
                <div className="profile-page-button-flex">
                    <button className="profile-page-button-call">Call</button>
                    <button className="profile-page-button-email">Email</button>
                </div>
            </div>)
}

export default Candidate;