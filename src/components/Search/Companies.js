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

export default function Companies() {
  return (<Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Company List
              <nav className="searchResults" aria-label="search results">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Yamaha" src="https://www.adacgj.com/uploads/1/2/3/7/123777558/yamaha-icon-26_orig.jpg" />
                    </ListItemAvatar>
                      <ListItemText
                        primary="Yamaha"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                            </Typography>
                            {"203 Job Openings"}
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
                        primary="Honeywell"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                            </Typography>
                            {"87 Job Openings"}
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
