import {React, useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery } from '@apollo/client';


const GET_OPENING = gql`
  query  Opening($id:Int!){
            opening(id:$id){
            title
            description
            companyId
            company{
                title
            }
          }
        }
        `;

const Job = () => {
    const location = useLocation();
    const id = location.state.id;
    const { loading, error, data } = useQuery(GET_OPENING, {variables:{id}});
    const [isNull, setIsNull] = useState(false);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
            <div className="profile-page-card">
                <h1 className="profile-page-title">{data.opening.title}</h1>
                <div className="profile-page-info">
                    <p>・Company : {data.opening.company.title}</p>
                    <p>・Description: {data.opening.description}</p>
                </div>
                <div >
                    <button className="job-apply-btn">Apply</button>
                </div>
            </div>)
}

export default Job;