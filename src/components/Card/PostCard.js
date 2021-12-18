import React, { Fragment, useEffect, useState} from "react";
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
import JobMiniCard from "../Card/JobMiniCard";
import Moment from 'react-moment';
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const PostCard =({id, name, date, content, openingId, job_title, job_description, job_company, job_employment, job_location}) => {
    return (<Card sx={{mb:2}}>
              <CardHeader
                avatar={<Avatar {...stringAvatar(name)} />}
                title={name}
                subheader=<Moment unix fromNow>{date}</Moment>
              />
              <CardContent sx={{pt:0}}>
              {content}
              {openingId?
              <JobMiniCard
                id = {openingId}
                title = {job_title}
                description={job_description.length > 10 ? job_description.substring(0, 80) + "..." : job_description}
                company = {job_company}
                employment = {job_employment}
                location = {job_location} />
              :null}
              </CardContent>
            </Card>)

}

export default PostCard;
