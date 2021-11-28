import {React, Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
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

import ProfileCard from "../Card/ProfileCard";

import { gql, useQuery } from '@apollo/client';

const GET_RECRUITERS = gql`
  query  Recruiters{
            recruiters{
            id
            first
            last
            email
          }
        }
        `;

export default function Recruiters (){
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_RECRUITERS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const clickHandler = (c) => {
    history.push({
      pathname: '/search/recruiter',
      search: `?query=id${c.id}`,
      state: { id: c.id }
    })
  }

  return (<div>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Recruiters
              <nav className="searchResults" aria-label="search results">
                <List>
                  {data.recruiters.map((c, idx) => {return (<div onClick={() => clickHandler(c)}>
                                                                  <ProfileCard 
                                                                    key = {idx}
                                                                    first_name = {c.first}
                                                                    last_name = {c.last}
                                                                    position = {c.position}
                                                                    location = {c.location}
                                                                    src = {`https://mui.com/static/images/avatar/${idx + 1}.jpg`}
                                                                    />
                                                                </div>)  
                                                                })}
                </List>
              </nav>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>
          </div>);
// 
}