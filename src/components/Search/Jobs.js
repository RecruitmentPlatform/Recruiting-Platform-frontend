import {React, Fragment, useEffect} from "react";
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

import JobCard from "../Card/JobCard";
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_OPENINGS = gql`
  query  Openings{
            openings{
            id
            title
            description
            companyId
            company{
              title
            }
          }
        }
        `;

export default function Jobs() {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_OPENINGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const clickHandler = (o) => {
    history.push({
      pathname: '/job',
      search: `?q=${o.id}`,
      state: { id: o.id }
    })
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
                    {data.openings.map((o, idx) => {return (<div onClick={() => clickHandler(o)}>
                      <JobCard key = {idx} title={o.title} description={o.description.length > 10 ? o.description.substring(0, 30) + "..." : o.description} company = {o.company.title} src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`} /></div>)})}
                  </List>
                </nav>
              </Grid>
              <Grid item md={8}>
              </Grid>
            </Grid>
          </div>);
//
}
