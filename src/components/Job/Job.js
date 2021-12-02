import {React, useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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

const GET_OPENING = gql`
  query Opening($id:Int!){
            opening(id:$id){
            title
            description
            companyId
            company{
                title
            }
          }
        }`;

const CREATE_APPLCATION = gql`
mutation CreateApplication($date:Int!, $openingId:Int!, $candidateId:Int!,$status:Int!) {
      createApplication(date:$date, openingId: $openingId, candidateId: $candidateId, status: $status){
        id
      }
  }`;

export default function Job() {
    const location = useLocation();
    const id = location.state.id;
    const history = useHistory()
    const { loading, error, data } = useQuery(GET_OPENING, {variables:{id}});
    const [createApplication, { data2, loading2, error2 }] = useMutation(CREATE_APPLCATION);
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

    if (loading2) return 'Loading...';
    if (error2) return `Error! ${error2.message}`;


    return(
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {data.opening.title}
          </Typography>
          <Typography>
            {data.opening.company.title}
            {data.opening.location}
          </Typography>
          <Button variant="outlined" onClick={handleClickOpen}>
            Apply Now
          </Button>
          <div>
            {data.opening.description}
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Apply </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Alert severity="info">Before submitting a job application — <Link href="#">complete your profile</Link>!</Alert>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="button" onClick={() => {createApplication(
                                                                            {variables: {
                                                                                  date:12345,
                                                                                  openingId:id,
                                                                                  candidateId: uid,
                                                                                  status:1}
                                                                                }
                                                                            )
                                                                            .then(history.push("/applications"))
                                                                       }
                                                                 }
              >Apply</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>);
}
