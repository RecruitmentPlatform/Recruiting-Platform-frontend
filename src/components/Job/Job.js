import {React, useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery } from '@apollo/client';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Submit an Application
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
              <Button variant="contained" onClick={handleClose}>Apply</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>)
}

export default Job;
