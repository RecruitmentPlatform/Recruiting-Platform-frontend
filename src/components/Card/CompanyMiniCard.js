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

const CompanyMiniCard =({id,title,location}) => {
    return (<Card sx={{mb:2}}>
        <CardActionArea href={"/company/"+id}>
          <CardHeader
            avatar={
              <Avatar alt={title} src={"//logo.clearbit.com/"+title.toLowerCase()+".com"} />
            }
            title={title}
            subheader={location}
          />
        </CardActionArea>
      </Card>)

}

export default CompanyMiniCard;
