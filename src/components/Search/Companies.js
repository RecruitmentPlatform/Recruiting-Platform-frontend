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

export default function Companies() {
  return (<Grid container>
            <Grid item xs>
            </Grid>
            <Grid item md={4}>
              Company List
              <nav className="searchResults" aria-label="search results">

              </nav>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>);
}
