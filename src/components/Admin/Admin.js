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
import Container from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import Divider from '@mui/material/Divider';

export default function Admin() {
  return (<Container sx={{ px: { xs: 1, md: 2 }, py:1 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ mx: 'auto'}}>
                <Typography
                  sx={{ display: "flex", mb:1, px:1 }}
                  component="h1"
                  variant="h6"
                  fontWeight="bold"
                  >
                  Administration Area
                </Typography>
                <Divider sx={{mb:2}}/>
                <Card sx={{ mb: 2 }}>
                  <CardHeader  sx={{ pb: 0 }}
                    action={
                      <IconButton aria-label="edit" /*onClick = {() => handleExperienceOpen()}*/>
                        <AddIcon />
                      </IconButton>
                    }
                    title="Skills"
                  />
                  <CardContent>
                    <List
                      sx={{ width: "100%"}}
                    >
                      <ListItem disablePadding>
                        <ListItemText primary="React" />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Javascript" />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Python" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader  sx={{ pb: 0 }}
                    action={
                      <IconButton aria-label="edit" /*onClick = {() => handleExperienceOpen()}*/>
                        <AddIcon />
                      </IconButton>
                    }
                    title="Positions"
                  />
                  <CardContent>
                    <List
                      sx={{ width: "100%"}}
                    >
                      <ListItem disablePadding>
                        <ListItemText primary="React" />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Javascript" />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Python" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>);
}
