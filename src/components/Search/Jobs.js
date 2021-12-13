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
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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
import JobSingleCard from "../Card/JobSingleCard";
import CompanyCard from "../Card/CompanyCard";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

const GET_OPENINGS = gql`
  query Openings($query:String,$location:String){
          openings(where: { or: [{ title: $query }, { location: $location }] }){
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
        website
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
  const uid = +sessionStorage.getItem("uid");
  let search = window.location.search;
  let params = new URLSearchParams(search);
  
  let query = params.get('q');
  let location = params.get('l');

  const { loading:openingsLoading, data:openingsData } = useQuery(GET_OPENINGS, {variables:{query: query, location: location}});

  const [getSingleOpening,
    { data:openingData, loading:openingLoading }]
     = useLazyQuery(GET_SINGLE_OPENING);

  const [createApplication, { data:applicationData, loading:applicationLoading }] = useMutation(CREATE_APPLICATION);

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
                    {openingsData?openingsData.openings.map((opening, id) => {return (<div style={{marginBottom:'12px'}} onClick={() => getSingleOpening({ variables: { id: opening.id } })}>
                      <JobCard
                        key = {id}
                        candidate_id = {opening.candidateId}
                        title = {opening.title}
                        description={opening.description.length > 10 ? opening.description.substring(0, 80) + "..." : opening.description}
                        first = {opening.candidate.first}
                        last = {opening.candidate.last}
                        location = {opening.location}
                        company = {opening.company.title}
                        employment = {opening.employment.title} />
                      </div>)}):"No job openings"}
              </Grid>
              <Grid item md={8}>
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
          </Container></div>);
}
