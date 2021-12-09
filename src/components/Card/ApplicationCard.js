import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {Card, CardContent, CardHeader, CardActions, CardActionArea } from '@mui/material';

const ApplicationCard =({title, company }) => {
    return (<Card sx={{mb:2}}>
              <CardContent sx={{ pb: 1 }}>
                <Typography
                    sx={{ pb: 0 }}
                    component="p"
                    variant="body2"
                    color="text.secondary"
                    >
                    Applied on April 14, 2021
                  </Typography>
              </CardContent>
              <CardHeader
                sx={{py:0}}
                avatar={
                  <Avatar alt={company} src={"//logo.clearbit.com/"+company.toLowerCase()+".com"} />
                }
                title={title}
                subheader={company}
                action=<Typography alignItems="center"
                  sx={{ display: "flex", height:'48px' }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  <Chip sx={{mr:.5}} size="small" icon={<WorkIcon />} label="Full Time" />
                  <Chip size="small" icon={<LocationOnIcon />} label="Palo Alto" />
                </Typography>
              />
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>)

}

export default ApplicationCard;
