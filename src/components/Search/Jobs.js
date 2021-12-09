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
import Stack from '@mui/material/Stack';

import Input from "@mui/material/Input";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
import CompanyCard from "../Card/CompanyCard";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

const GET_OPENINGS = gql`
  query Openings{
          openings{
            id
            title
            description
            location
            candidateId
            salaryLow
            salaryHigh
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
            }
          }
        }`;

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
            <Chip size="small" sx={{ ml:1, mb:1 }} label="Post a free job" component="a" href="/post" color="success" clickable />
            <Grid container sx={{ my: { xs: 2, md: 0 } }}>
              <Grid item md={4} sx={{px:1}}>
                    {openingsData?openingsData.openings.map((o, idx) => {return (<div style={{marginBottom:'12px'}} onClick={() => getSingleOpening({ variables: { id: o.id } })}>
                      <JobCard
                        key = {idx}
                        candidate_id = {o.candidateId}
                        title = {o.title}
                        description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
                        first = {o.candidate.first}
                        last = {o.candidate.last}
                        location = {o.location}
                        company = {o.company.title}
                        employment = {o.employment.title} />
                      </div>)}):"No job openings"}
              </Grid>
              <Grid item md={8}>
              {openingData?
                <Card sx={{mb:2}}>
                  <CardHeader
                    avatar={
                      <Avatar alt={openingData.opening.company.title} src={"//logo.clearbit.com/"+openingData.opening.company.title.toLowerCase()+".com"} />
                    }
                    title=<Typography sx={{fontWeight: 'bold'}} component="h1" variant="h6">
                      {openingData.opening.title}
                    </Typography>
                    subheader={openingData.opening.company.title}
                    action={<Button variant="contained" onClick={handleClickOpen}>
                      Apply Now
                    </Button>}
                  />
                  <CardContent sx={{pt:0}}>
                    <Stack direction="row" spacing={1}>
                      <Chip size="small" color="primary" sx={{mr:.5}} icon={<WorkIcon />} label={openingData.opening.employment.title}  />
                      <Chip size="small" color="primary" icon={<LocationOnIcon />} label={openingData.opening.location}  />
                      <Chip size="small" color="success" icon={<AttachMoneyIcon />} label={openingData.opening.salaryLow + " - " + openingData.opening.salaryHigh}  />
                      <Chip size="small"
                        color="info"
                        avatar=<Avatar alt="Natacha" src={"https://mui.com/static/images/avatar/"+openingData.opening.recruiterId+".jpg"} />
                        label={openingData.opening.candidate.first + " " + openingData.opening.candidate.last}
                        component="a"
                        href={"/u/"+1}

                        clickable
                      />
                      <Chip size="small" icon={<AccessTimeIcon />} label="2 hours ago"  />
                    </Stack>
                  </CardContent>
                  <Divider/>
                  <CardContent>
                    <Typography>
                      {openingData.opening.location}
                    </Typography>
                    <div>
                      {openingData.opening.description}
                    </div>
                  </CardContent>
                  <Divider/>
                  <CardContent>
                    <Typography
                      component="h3"
                      variant="h6">About the Company</Typography>
                    <CompanyCard
                      id = {openingData.opening.companyId}
                      title = {openingData.opening.company.title}
                      description={openingData.opening.company.description.length > 300 ? openingData.opening.company.description.substring(0, 300) + "..." : openingData.opening.company.description}
                       />
                  </CardContent>
                  <Divider/>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
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
                              openingId: openingData.opening.id,
                              candidateId: 2,
                              status: 1
                            }
                          })
                          .then(history.push("/applications"))
                      }}>Apply</Button>
                    </DialogActions>
                  </Dialog>
                </Card>: null }
              </Grid>
            </Grid>
          </Container></div>);
}
