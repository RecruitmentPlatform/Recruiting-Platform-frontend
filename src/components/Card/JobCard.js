import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import {Card, CardContent, CardHeader, CardActionArea } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const JobCard =({title, description, candidate_id, first, last, location, salaryLow, salaryHigh, company, employment}) => {
    return (<Card>
        <CardActionArea>
          <CardContent sx={{ py: 1 }}>
          <Typography
              sx={{ pb: 0 }}
              component="p"
              variant="body4"
              color="text.secondary"
              >
              <Box component="a" href={"/u/"+candidate_id} sx={{color:'#000', textDecoration:'none'}} fontWeight='bold'>{first + " " + last}</Box> posted this job on April 14, 2021
            </Typography>
          </CardContent>
          <Divider/>
          <CardHeader
            sx={{pb:0}}
            avatar={
              <Avatar alt={company} src={"//logo.clearbit.com/"+company.toLowerCase()+".com"} />
            }
            title={title}
            subheader={company}
          />
          <CardContent>
            <Stack direction="row" spacing={1}>
              <Chip variant="outlined" color="primary" size="small" icon={<WorkIcon />} label={employment} />
              <Chip variant="outlined" color="primary" size="small" icon={<LocationOnIcon />} label={location} />
            </Stack>
              <Typography
                variant="body2"
                color="text.secondary">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>)

}

export default JobCard;
