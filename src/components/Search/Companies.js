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

import CompanyCard from "../Card/CompanyCard";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

const GET_COMPANIES = gql`
  query Companies{
    companies{
      id
      title
      description
    }
  }`;

export default function Jobs() {
  const uid = +sessionStorage.getItem("uid");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let query = params.get('q');

  const { loading:companiesLoading, data:companiesData } = useQuery(GET_COMPANIES,{variables:{query}});

  if (companiesLoading) return 'Loading...';

  return (<div><Paper square sx={{mb:1}}>
            <Container>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
              >
                <TextField
                  placeholder="Company title or keywords"
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
            <Grid container>
              <Grid item lg={6} sx={{px:1, mx:'auto'}}>
                    {companiesData?companiesData.companies.map((company, id) => {return (<div style={{marginBottom:'12px'}}>
                      <CompanyCard
                        key = {id}
                        id = {company.id}
                        title = {company.title}
                        description = {company.description.length > 10 ? company.description.substring(0, 70) + "..." : company.description} />
                      </div>)}):"No companies found."}
              </Grid>
            </Grid>
          </Container></div>);
}
