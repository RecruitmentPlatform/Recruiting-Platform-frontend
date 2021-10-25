import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

export default function Jobs() {
  return (<Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Job List
              <nav className="searchResults" aria-label="search results">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgXvZycVg8nFhEteByZ-aL16Jv-2bNch2GdfV&s=0" />
                    </ListItemAvatar>
                      <ListItemText
                        primary="Senior Software Engineer"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Google
                            </Typography>
                            {" — Mountain View, CA"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt="Honeywell" src="https://www.versacall.com/wp-content/uploads/2017/09/Honeywell-Logo-Featured.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Junior Software Engineer"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Google
                            </Typography>
                            {" — Austin, TX"}
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
