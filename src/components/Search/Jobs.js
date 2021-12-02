import {React, Fragment, useState, useEffect} from "react";
import { useHistory } from "react-router";
import axios from "axios"
// import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
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

import JobCard from "../Card/JobCard";
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_OPENINGS = gql`
  query Openings{
          openings{
            id
            title
            description
            companyId
            company{
              title
            }
          }
        }`;

const GET_SINGLE_OPENING = gql`
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

export default function Jobs() {

  const { loading:openingsLoading, data:openingsData } = useQuery(GET_OPENINGS);
  const [
    getSingleOpening,
    { data:openingData, loading:openingLoading }
  ] = useLazyQuery(GET_SINGLE_OPENING);

  const history = useHistory()
  // Modal data
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (openingsLoading) return 'Loading...';

  if (openingData) {
    console.log(openingData.opening);
  }

  return (<div>
            <Grid container sx={{ my: { xs: 2, md: 0 } }}>
              <Grid item md={4} sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="text.primary"
                  gutterBottom
                >
                  Current Openings
                </Typography>
                <nav className="searchResults" aria-label="search results">
                  <List>
                    {openingsData.openings.map((o, idx) => {return (<div onClick={() => getSingleOpening({ variables: { id: o.id } })}>
                      <JobCard key = {idx} title={o.title} description={o.description.length > 10 ? o.description.substring(0, 30) + "..." : o.description} company = {o.company.title} src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} /></div>)})}
                  </List>
                </nav>
              </Grid>
              <Grid item md={8}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h4" align="center">
                    {openingData?openingData.opening.title:''}
                  </Typography>
                  <Typography>
                    {openingData?openingData.opening.company.title:''}
                    {openingData?openingData.opening.location:''}
                  </Typography>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Apply Now
                  </Button>
                  <div>
                    {openingData?openingData.opening.description:''}
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
                      <Button variant="contained" type="button">Apply</Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </Grid>
            </Grid>
          </div>);
}
