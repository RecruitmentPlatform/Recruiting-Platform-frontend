import {React, useState, useEffect} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import JobSingleCard from "../Card/JobSingleCard";

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import Moment from 'react-moment';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const GET_SINGLE_OPENING = gql`
  query Opening($id:Int!){
    opening(id:$id){
      id
      title
      date
      description
      location
      startMonth
      startYear
      salaryLow
      salaryHigh
      candidateId
      employment {
        title
      }
      candidateId
      candidate {
        first
        last
      }
      companyId
      company{
        title
        description
        website
      }
    }
  }`;

const GET_OPENING_APPLICATIONS = gql`
  query GetOpeningApplications($id:Int!) {
    opening(id:$id) {
      applications {
        id
        candidate {
          id
          first
          last
        }
      }
    }
  }
`;

export default function Job() {
    //const location = useLocation();
    //const id = location.state.id;
    var { id } = useParams();
    id = parseInt(id);

    const history = useHistory()
    const { loading:openingLoading, error:openingError, data:openingData } = useQuery(GET_SINGLE_OPENING, {variables:{id}});

    const { loading:applicationsLoading, error:applicationsError, data:applicationsData } = useQuery(GET_OPENING_APPLICATIONS, {variables:{id}});
    const [isNull, setIsNull] = useState(false);
    const uid = +sessionStorage.getItem("uid");

    if (openingLoading) return 'Loading opening...';
    if (applicationsLoading) return 'Loading applications...';

    if (openingError) return `Error! ${openingError.message}`;
    if (applicationsError) return `Error! ${applicationsError.message}`;

    return(
      <Container component="main">
        <Grid container sx={{ my: 2 }}>
          <Grid item md={8} xs={12} sx={{ mx: 'auto'}}>
            {openingData?
              <JobSingleCard
              id = {openingData.opening.id}
              title = {openingData.opening.title}
              date = {openingData.opening.date}
              company = {openingData.opening.company.title}
              companyId = {openingData.opening.companyId}
              companyDescription = {openingData.opening.company.description}
              description = {openingData.opening.description}
              website = {openingData.opening.company.website}
              employment = {openingData.opening.employment.title}
              location = {openingData.opening.location}
              salaryLow = {openingData.opening.salaryLow}
              salaryHigh = {openingData.opening.salaryHigh}
              candidateId = {openingData.opening.candidateId}
              first = {openingData.opening.candidate.first}
              last = {openingData.opening.candidate.last} />
              :null}

              <Card>
                <CardHeader sx={{py:1}}
                  title=<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                    Applicants
                  </Typography>
                />
                {applicationsData.opening.applications.map((application, application_id) => {return (<div>
                  {application_id > 0 ? <Divider variant="inset"/> : null}
                    <CardHeader
                    avatar={
                      <Avatar {...stringAvatar(application.candidate.first+" "+application.candidate.last)} />
                      }
                    title=<Typography component="h1" sx={{fontSize:'15px'}}>
                            <Link href={"/u/"+application.candidate.id} underline="hover">
                              {application.candidate.first+" "+application.candidate.last}
                            </Link>
                          </Typography>
                    />
                </div>)})}
              </Card>
        </Grid>
      </Grid>
    </Container>
      );
}
