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

import JobSingleCard from "../Card/JobSingleCard";

const GET_SINGLE_OPENING = gql`
  query Opening($id:Int!){
    opening(id:$id){
      id
      title
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

export default function Job() {
    //const location = useLocation();
    //const id = location.state.id;
    var { id } = useParams();
    id = parseInt(id);
    const history = useHistory()
    const { loading, error, data:openingData } = useQuery(GET_SINGLE_OPENING, {variables:{id}});
    const [isNull, setIsNull] = useState(false);
    const uid = +sessionStorage.getItem("uid");

    // Modal data
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
      <Container component="main">
        <Grid container sx={{ my: 2 }}>
          <Grid item md={8} xs={12} sx={{ mx: 'auto'}}>
            {openingData?
              <JobSingleCard
              id = {openingData.opening.id}
              title = {openingData.opening.title}
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
        </Grid>
      </Grid>
    </Container>
      );
}
