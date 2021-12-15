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
import {Card, CardContent, CardHeader, CardActionArea } from '@mui/material';

const JobMiniCard =({id, title, description, company, location, employment}) => {
    return (<Card sx={{mb:2}}>
        <CardActionArea href={"/job/"+id}>
          <CardHeader
            avatar={
              <Avatar alt={company} src={"//logo.clearbit.com/"+company.toLowerCase()+".com"} />
            }
            title={title}
            subheader={company}
            action=<div alignItems="center" style={{display:'flex', alignItems:'center', height:'56px'}}>{employment?<Chip size="small" sx={{mr:.5}} icon={<WorkIcon />} label={employment} />:null}
            {location?<Chip size="small" icon={<LocationOnIcon />} label={location} />:null}</div>
          />
        </CardActionArea>
      </Card>)

}

export default JobMiniCard;
