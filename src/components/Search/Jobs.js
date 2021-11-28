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
import { gql, useQuery } from '@apollo/client';



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
      pathname: '/search/job',
      search: `?query=id${o.id}`,
      state: { id: o.id }
    })
  }
  return (<div>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Job Openings
              <nav className="searchResults" aria-label="search results">
                <List>
                  {data.openings.map((o, idx) => {return (<div onClick={() => clickHandler(o)}>
                                                                  <JobCard 
                                                                    key = {idx}
                                                                    title={o.title}
                                                                    description={o.description}
                                                                    company = {o.company.title}
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
