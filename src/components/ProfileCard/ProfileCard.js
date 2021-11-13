import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ProfileCard =({first_name, last_name, position, location}) => {
    const full_name = first_name + " " + last_name;

    return (<ListItem disablePadding>
        <ListItemButton>
        <ListItemAvatar>
            <Avatar alt="John Doe" src="https://mui.com/static/images/avatar/1.jpg" />
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
                {" — " + location}
                </Fragment>
            }
            />
        </ListItemButton>
        </ListItem>)
    
}

export default ProfileCard;