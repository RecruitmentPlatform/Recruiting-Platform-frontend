import {React, Fragment, useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
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
import JobMiniCard from "../Card/JobMiniCard";
import CompanyMiniCard from "../Card/CompanyMiniCard";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

const GET_OPENINGS = gql`
  query Openings($query:String){
    openings(where:{title:$query}){
      id
      title
      description
      companyId
      company{
        title
      }
    }
  }`;

const GET_COMPANIES = gql`
  query Companies($query:String){
    companies(where:{title:$query}){
      id
      title
      description
    }
  }`;

export default function Search() {

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let query = params.get('q');

  const { loading:openingsLoading, data:openingsData } = useQuery(GET_OPENINGS, {variables:{query}});

  const { loading:companiesLoading, data:companiesData } = useQuery(GET_COMPANIES, {variables:{query}});

  const history = useHistory()

  if (openingsLoading) return 'Loading...';
  if (companiesLoading) return 'Loading...';

  return (<Container sx={{ px: { xs: 1, md: 2 }, py:1 }}>
            <Grid container>
              <Grid item md={6} sx={{ mx: 'auto'}}>
                <Typography
                  sx={{ display: "flex", mb:1, px:1 }}
                  component="h1"
                  variant="h6"
                  >
                  Results for "{query}"
                </Typography>
                <Typography
                  sx={{ display: "flex", mb:1, px:1 }}
                  component="p"
                  variant="body2"
                  color="text.secondary"
                  >
                  2 jobs found <Chip size="small" sx={{ ml:1 }} label="Post a free job" component="a" href="/post" variant="outlined" color="primary" clickable />
                </Typography>
                    {openingsData.openings.map((o, idx) => {return (<div>
                      <JobMiniCard
                        key = {idx}
                        title = {o.title}
                        description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
                        company = {o.company.title}
                        src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} />
                      </div>)})}
                <Typography
                  sx={{ display: "flex", mb:1, px:1 }}
                  component="p"
                  variant="body2"
                  color="text.secondary"
                  >
                  2 companies found
                </Typography>
                    {companiesData.companies.map((c, idx) => {return (<div>
                      <CompanyMiniCard
                        key = {idx}
                        title = {c.title}
                        description={c.description.length > 10 ? c.description.substring(0, 80) + "..." : c.description}
                        src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} />
                      </div>)})}
              </Grid>
            </Grid>
          </Container>);
}
