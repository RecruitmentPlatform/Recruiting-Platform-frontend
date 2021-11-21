import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ProfileCard =({first_name, last_name, position, location, src, company}) => {
    const full_name = first_name + " " + last_name;

    return (<ListItem disablePadding>
        <ListItemButton>
        <ListItemAvatar>
            <Avatar alt="John Doe" src={src}/>
        </ListItemAvatar>
            <ListItemText
            primary={full_name}
            secondary={
                <Fragment>
                <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {position}
                </Typography>
                {company}
                {" — " + location}
                </Fragment>
            }
            />
        </ListItemButton>
        </ListItem>)
    
}

export default ProfileCard;