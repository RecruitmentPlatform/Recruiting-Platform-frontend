import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const JobCard =({title, description, company}) => {
    return (<ListItem disablePadding>
        <ListItemButton>
        <ListItemAvatar>
        <Avatar alt="Google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgXvZycVg8nFhEteByZ-aL16Jv-2bNch2GdfV&s=0" />
        </ListItemAvatar>
            <ListItemText
            primary={title}
            secondary={
                <Fragment>
                <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                </Typography>
                {company}
                <br/>
                {" - " + " " + description}
                {/* {" — " + location} */}
                </Fragment>
            }
            />
        </ListItemButton>
        </ListItem>)
    
}

export default JobCard;