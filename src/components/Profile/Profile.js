import {React, Fragment, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

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

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const GET_PROFILE = gql`
  query GetProfile($id:Int!){
          candidate(id:$id) {
            first
            last
            description
            experiences {
              id
              start
              end
              description
              employment {
                id
                title
              }
              company {
                id
                title
              }
              position {
                id
                title
              }
            }
            educations {
              id
              start
              end
              description
              college {
                id
                title
              }
            }
          }
        }`;

/*function openFunc(value) {
  this.setState({
     open_dialog: true,
     myid: value
  });
}*/

export default function Profile() {
  const [formData, setFormData] = useState({"title":"", "employmentType":"", "CompanyName":"","Location":"","Start":"","End":"", "Description":""})

  // Modal data
  const [open, setOpen] = useState(false);
  const handleExperienceOpen = (value) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { loading, error, data } = useQuery(GET_PROFILE, {variables:{id:1}});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleInput = (e) => {
    const key = e.target.name;
    setFormData({...formData, [key]:e.target.value});
    console.log(e.target.value)
  }

  return(
    <Container component="main">
      <Grid container sx={{ my: { xs: 2, md: 0 } }}>
        <Grid item md={8} sx={{ p: { xs: 2, md: 3 } }}>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random"
              alt="image alt"
            />
            <CardHeader
              avatar={
                <Avatar {...stringAvatar(data.candidate.first+" "+data.candidate.last)} />
              }
              title={data.candidate.first+" "+data.candidate.last}
              subheader="Engineer at Facebook"
              action={<Button variant="contained">Edit Profile</Button>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {data.candidate.description}
              </Typography>
            </CardContent>
          </Card>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogContent>
              <TextField
                name="title"
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInput}
              />
              <TextField
                name="employment type"
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                label="Employment Type"
                fullWidth
                variant="standard"
                onChange={handleInput}
              />
              <TextField
                name="compamy name"
                autoFocus
                margin="dense"
                id="name"
                label="Company Name"
                fullWidth
                variant="standard"
                onChange={handleInput}
              />
              <TextField
                name="location"
                autoFocus
                margin="dense"
                id="name"
                label="Locaton"
                fullWidth
                variant="standard"
                onChange={handleInput}
              />
              <TextField
                name="start"
                autoFocus
                margin="dense"
                id="name"
                label="Start"
                fullWidth
                variant="standard"
                onChange={handleInput}
              />
              <TextField
                name="end"
                autoFocus
                margin="dense"
                id="name"
                label="End"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInput}
              />
              <TextField
                name="description"
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInput}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Card sx={{ mb: 2 }}>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleExperienceOpen()}>
                  <AddIcon />
                </IconButton>
              }
              title="Experience"
            />
            <CardActionArea>
              <CardHeader
                avatar={
                  <Avatar alt="Yamaha" src="https://www.adacgj.com/uploads/1/2/3/7/123777558/yamaha-icon-26_orig.jpg" />
                }
                title="Senior Software Engineer"
                subheader="Yamaha Inc."
              />
            </CardActionArea>
            <Divider variant="inset"/>
            <CardActionArea>
              <CardHeader
                avatar={
                  <Avatar alt="Google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgXvZycVg8nFhEteByZ-aL16Jv-2bNch2GdfV&s=0" />
                }
                title="Junior Web Developer"
                subheader="Google Inc."
              />
            </CardActionArea>
          </Card>
          <Card>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleExperienceOpen()}>
                  <AddIcon />
                </IconButton>
              }
              title="Skills"
            />
            <CardContent>
              <List
                sx={{ width: "100%"}}
              >
                <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                  <ListItemText primary="React" />
                </ListItem>
                <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                  <ListItemText primary="Javascript" />
                </ListItem>
                <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                  <ListItemText primary="Python" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} sx={{ p: { xs: 2, md: 3 } }}>
          <Card>
            <CardHeader  sx={{ pb: 0 }}
              title="Similar Candidates"
            />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Ali Connors" src="https://mui.com/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Ali Connors"
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Copywriter
                      </Typography>
                      {" — Google Inc."}
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Travis Howard"
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Systems Engineer
                      </Typography>
                      {" — Apple Inc."}
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Adam Sanders" src="https://mui.com/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Adam Sanders"
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Production Head
                      </Typography>
                      {' — MGM Studios'}
                    </Fragment>
                  }
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>);
}
