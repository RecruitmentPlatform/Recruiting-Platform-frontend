import * as React from "react";
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

export default function Candidates() {
  return (<Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Recruiters
              <nav className="searchResults" aria-label="search results">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="John Doe" src="https://mui.com/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                      <ListItemText
                        primary="John Doe"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Campus Recruiter
                            </Typography>
                            {" — Facebook"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt="Jane Doe" src="https://mui.com/static/images/avatar/3.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Jane Doe"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Technical Recruiter
                            </Typography>
                            {" — Google"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>);
}
