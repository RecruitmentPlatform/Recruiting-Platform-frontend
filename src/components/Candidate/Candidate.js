import {React, useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";


const Candidate = () => {
    const location = useLocation();
    const [helperMessage, setHelperMessage] = useState("")
    const [canidateInfo, setCandidateInfo] = useState({ "id": "", "first_name": "", "last_name": "", "email": "", "phone": "",
                                                      "gender_id": "", "gender_pronoun_id": "", "ethnicity_id": "", "description": "",});
    const [isNull, setIsNull] = useState(false);

    useEffect(()=>{
        const f = async () => {
            const res = await axios.get(`http://127.0.0.1:5000/api/candidates/id/${location.state.id}`);
            const data = res.data;
            console.log(data)
            if(data.status === "fail"){
                setHelperMessage(data.message);
                setIsNull(true);
            }else{ 
                const candidate = data.candidate;
                setCandidateInfo({...canidateInfo, "id": candidate.id, "first_name": candidate.first_name,  "last_name":candidate.last_name, 
                                                   "email": candidate.email, "phone":candidate.phone,
                                                   "gender_id": candidate.gender_id, "gender_pronoun_id": candidate.gender_pronoun_id,
                                                    "ethnicity_id":candidate.ethnicity_id, "description":candidate.description})
                setIsNull(false);
            }
        }
        f()
    },[location])

    return(<div>
            {isNull ? <h3>{helperMessage}</h3> : null}
            {!isNull ? Object.entries(canidateInfo).map(([key, value]) =><p>{key} : {value}</p>) : null}
           </div>)
}

export default Candidate;