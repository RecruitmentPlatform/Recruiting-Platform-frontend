import {React, Fragment, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import JobCard from "../Card/JobCard";

const GET_COMPANY_OPENINGS = gql`
  query Openings($companyId:Int!){
          openings(where:{companyId:$companyId}){
            id
            title
            description
          }
        }`;

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

const GET_COMPANY = gql`
  query GetCompany($id:Int!){
          company(id:$id) {
            title
            description
          }
        }`;

/*function openFunc(value) {
  this.setState({
     open_dialog: true,
     myid: value
  });
}*/

export default function Company() {
  const { loading, error, data } = useQuery(GET_COMPANY, {variables:{id:1}});

  const { data:openingsData, loading:openingsLoading } = useQuery(GET_COMPANY_OPENINGS, {variables:{companyId:1}});

  if (openingsLoading) return 'Loading...';

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <Container component="main">
      <Grid container sx={{ my: { xs: 2, md: 0 } }}>
        <Grid item md={5} sx={{ p: { xs: 2, md: 3 } }}>
          <Card sx={{ mb: 2 }}>
            <Box alignItems='center' sx={{p:1, display:'flex'}}>
              <Avatar {...stringAvatar(data.company.title)} />
              <Typography sx={{ml:1, fontWeight:'bold'}} component="h1" variant="h6">{data.company.title}</Typography>
            </Box>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random"
              alt="image alt"
            />
            <Divider/>
            <CardContent>
              <Typography sx={{fontWeight:'bold'}} component="h1" variant="h6">
                About {data.company.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.company.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={7} sx={{ p: { xs: 2, md: 3 } }}>
          <Typography sx={{fontWeight:'bold'}} component="h2" variant="h6">
            Jobs at {data.company.title}
          </Typography>
          {openingsData.openings.map((o, idx) => {return (<div>
            <JobCard
              key = {idx}
              title = {o.title}
              description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
              company = {data.company.title}
              src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} />
            </div>)})}
        </Grid>
      </Grid>
    </Container>);
}
