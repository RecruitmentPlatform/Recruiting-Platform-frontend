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
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Input from "@mui/material/Input";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Chip from '@mui/material/Chip';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import JobCard from "../Card/JobCard";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

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

const CREATE_APPLICATION = gql`
mutation CreateApplication($date:Int!, $openingId:Int!, $candidateId:Int!,$status:Int!) {
      createApplication(date:$date, openingId: $openingId, candidateId: $candidateId, status: $status){
        id
      }
  }`;

export default function Jobs() {

  const { loading:openingsLoading, data:openingsData } = useQuery(GET_OPENINGS);
  const [
    getSingleOpening,
    { data:openingData, loading:openingLoading }
  ] = useLazyQuery(GET_SINGLE_OPENING);

  const [createApplication, { data:applicationData, loading:applicationLoading }] = useMutation(CREATE_APPLICATION);

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

  return (<div><Paper square sx={{mb:1}}>
            <Container>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder="Job title or keywords"
                  variant="outlined"
                  size="small"
                  name="q"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon/>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Location"
                  variant="outlined"
                  size="small"
                  name="l"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon/>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" type="submit">Search</Button>
              </Box>
            </Container>
          </Paper>
          <Container>
            <Typography
                      sx={{ display: "flex", mb:1, px:1 }}
                      component="p"
                      variant="body2"
                      color="text.secondary"
                      >
                      2 jobs found <Chip size="small" sx={{ ml:1 }} label="Post a free job" component="a" href="/post" variant="outlined" color="primary" clickable />
            </Typography>
            <Grid container sx={{ my: { xs: 2, md: 0 } }}>
              <Grid item md={4} sx={{  px:1}}>
                    {openingsData.openings.map((o, idx) => {return (<div onClick={() => getSingleOpening({ variables: { id: o.id } })}>
                      <JobCard
                        key = {idx}
                        title = {o.title}
                        description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
                        company = {o.company.title}
                        src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} />
                      </div>)})}
              </Grid>
              <Grid item md={8}>
                <Card sx={{mb:2}}>
                  <CardContent sx={{pb:0}}>
                    <Typography component="h1" variant="h6">
                      {openingData?openingData.opening.title:''}
                    </Typography>
                  </CardContent>
                  <Divider sx={{my:2}} />
                  <CardHeader
                    sx={{py:0}}
                    avatar={
                      <Avatar alt="Google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgXvZycVg8nFhEteByZ-aL16Jv-2bNch2GdfV&s=0" />
                    }
                    title={openingData?openingData.opening.company.title:''}
                    subheader={"Palo Alto"}
                    action={<Button variant="contained" onClick={handleClickOpen}>
                      Apply Now
                    </Button>}
                  />
                  <Divider sx={{my:2}} />
                  <CardContent sx={{pt:0}}>
                    <Typography>
                      {openingData?openingData.opening.location:''}
                    </Typography>
                    <div>
                      {openingData?openingData.opening.description:''}
                    </div>
                  </CardContent>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Apply </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <Alert severity="info">Before submitting a job application — <Link href="/u">complete your profile</Link>!</Alert>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" type="button"
                      onClick={() => {
                        createApplication({
                            variables: {
                              date: 666,
                              openingId: 1,
                              candidateId: 2,
                              status: 1
                            }
                          })
                          .then(history.push("/applications"))
                      }}>Apply</Button>
                    </DialogActions>
                  </Dialog>
                </Card>
              </Grid>
            </Grid>
          </Container></div>);
}
