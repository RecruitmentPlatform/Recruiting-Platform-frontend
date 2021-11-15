import {React, Fragment, useEffect, useState} from "react";
import axios from "axios";
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

import ProfileCard from "../ProfileCard/ProfileCard";

export default function Candidates() {
  
  const [candidate, setCandidate] = useState([])
  const [helperMessage, setHelperMessage] = useState("")
  const history = useHistory()
  const sampleCandidateList = [{"id":"1", "first_name":"John", "last_name":"Doe", "email":"123@email.com", "position":"Full Stack Developer", "location":"Los Angeles"}, 
                               {"id":"2", "first_name":"Jane", "last_name":"Doe", "email":"456@email.com", "position":"Web Developer", "location":"Dallas"},
                               {"id":"3", "first_name":"Vitamin", "last_name":"Water", "email":"789@email.com", "position":"Data Engineer", "location":"San Jose"}]
  
  useEffect(() => {
    const f = async() => {
      const res = await axios.get("http://127.0.0.1:5000/api/candidates/all");
      const data = res.data;
      if(data.status === "fail"){
        setHelperMessage(data.message)
      }else{
        setCandidate(data.candidate)
      }
    }
    f()
  },[])

  const clickHandler = (c) => {
    history.push({
      pathname: '/search/candidate',
      search: `?query=id${c.id}`,
      state: { id: c.id }
    })
  }





  return (<div>
  
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Candidate
              <nav className="searchResults" aria-label="search results">
                <List>
                  {/* <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="John Doe" src="https://mui.com/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                      <ListItemText
                        primary="John Doe"
                        secondary={
                          <Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Full Stack Engineer
                            </Typography>
                            {" — Los Angeles, CA"}
                          </Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem> */}

                  {/* sample -- > render multiple items */}
                  {sampleCandidateList.map((c, idx) => {return (<div onClick={() => clickHandler(c)}>
                                                                  <ProfileCard 
                                                                    key = {idx}
                                                                    first_name = {c.first_name}
                                                                    last_name = {c.last_name}
                                                                    position = {c.position}
                                                                    location = {c.location}
                                                                    />
                                                                </div>)  
                                                                })}
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt="Jane Doe" src="https://mui.com/static/images/avatar/3.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Jane Doe"
                        secondary={
                          <Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Senior Web Developer
                            </Typography>
                            {" — New York, NY"}
                          </Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>
          </div>);
}
