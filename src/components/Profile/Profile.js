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

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Add from "@mui/icons-material/Add";

import ProfileInfoCard from "../Card/ProfileInfoCard";

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
              location
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

const ADD_EXPERIENCE = gql`
    mutation CreateExperience($candidateId:Int!, $companyId:Int!,$start:Int!, $end:Int!, $positionId:Int!, $categoryId:Int!, $employmentId:Int!,
                              $location:String!, $description:String!) {
        createExperience(candidateId:$candidateId, companyId:$companyId, start: $start, end: $end, positionId: $positionId, categoryId: $categoryId,
                         employmentId:$employmentId, location:$location, description:$description){
                           id
                         }}`;

const EDIT_EXPERIENCE = gql`
    mutation EditExperience($id:Int, $location:String,$companyId:Int, $companyId:Int, $categoryId:Int, $description:String, $employmentId:Int) {
          editExperience(id:$id, location:$location, companyId: $companyId, companyId: $companyId, categoryId: $categoryId, description:$description, employmentId:$employmentId) {
              id
            }}`;

/*function openFunc(value) {
  this.setState({
     open_dialog: true,
     myid: value
  });
}*/

export default function Profile() {

  const [formExperienceAdd, setFormExperienceAdd] = useState({"Title":"", "EmploymentType":"", "CompanyName":"","Location":"","Start":"","End":"", "Description":""})
  const [formExperienceEdit, setFormExperienceEdit] = useState({"Title":"", "EmploymentType":"", "CompanyName":"","Location":"","Start":"","End":"", "Description":""})
  const [editExprienceIdx, setEditExprienceIdx] = useState(0)

  // Modal data
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = (value) => {
    setOpenAdd(true);
  };
  const handleClose = () => {
    setOpenAdd(false);
  };

  const handleClickOpenEdit = (idx) => {
    setFormExperienceEdit({...formExperienceEdit, "Title":data.candidate.experiences[editExprienceIdx].position.title,
                                                  "EmploymentType":"", CompanyName:data.candidate.experiences[editExprienceIdx].company.title,
                                                  "Location":data.candidate.experiences[editExprienceIdx].location, 
                                                  "Start":data.candidate.experiences[editExprienceIdx].start,
                                                  "End":data.candidate.experiences[editExprienceIdx].end,
                                                  "Description":data.candidate.experiences[editExprienceIdx].description})
    setEditExprienceIdx(idx)
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setEditExprienceIdx(0)
    setOpenEdit(false);
  };

  const { loading, error, data } = useQuery(GET_PROFILE, {variables:{id:1}});
  const [createExperiene, {loading2, error2}] = useMutation(ADD_EXPERIENCE, {variables:{candidateId:1, companyId:1, start:123, end:123, positionId:2, 
                                                                                     categoryId:1, employmentId:1, location: "San Fransisco", 
                                                                                     description:"Build recruiting platform"}})
  const [editExperience, {loading3, error3}] = useMutation(EDIT_EXPERIENCE)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // console.log(data);

  const handleInputAddExperience = (e) => {
    const key = e.target.name;
    console.log(key)
    setFormExperienceAdd({...formExperienceAdd, [key]:e.target.value});
    console.log(formExperienceAdd)
  };

  const handleInputEditExperience = (e) => {
    const key = e.target.name;
    console.log(formExperienceEdit)
    setFormExperienceEdit({...formExperienceEdit, [key]:e.target.value});
  };



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
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.candidate.description}
            </Typography>
          </CardContent>
          </Card>

          <Dialog open={openAdd} onClose={handleClose}>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogContent>
              <TextField
                name="Title"
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInputAddExperience}
              />
              <TextField
                name="EmploymentType"
                autoFocus
                margin="dense"
                id="name"
                label="Employment Type"
                fullWidth
                variant="standard"
                onChange={handleInputAddExperience}
              />
              <TextField
                name="CompanyName"
                autoFocus
                margin="dense"
                id="name"
                label="Company Name"
                fullWidth
                variant="standard"
                onChange={handleInputAddExperience}
              />
              <TextField
                name="Location"
                autoFocus
                margin="dense"
                id="name"
                label="Locaton"
                fullWidth
                variant="standard"
                onChange={handleInputAddExperience}
              />
              <TextField
                name="Start"
                autoFocus
                margin="dense"
                id="name"
                label="Start"
                fullWidth
                variant="standard"
                onChange={handleInputAddExperience}
              />
              <TextField
                name="End"
                autoFocus
                margin="dense"
                id="name"
                label="End"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInputAddExperience}
              />
              <TextField
                name="Description"
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInputAddExperience}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={createExperiene}>Submit</Button>
            </DialogActions>
          </Dialog>



          <Dialog open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle>Edit Experience</DialogTitle>
            <DialogContent>
              <TextField
                name="Title"
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].position.title}
                onChange={handleInputEditExperience}
              />
              <TextField
                name="EmploymentType"
                autoFocus
                margin="dense"
                id="name"
                label="Employment Type"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={handleInputEditExperience}
              />
              <TextField
                name="CompanyName"
                autoFocus
                margin="dense"
                id="name"
                label="Company Name"
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].company.title}
                onChange={handleInputEditExperience}
              />
              <TextField
                name="Location"
                autoFocus
                margin="dense"
                id="name"
                label="Locaton"
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].location}
                onChange={handleInputEditExperience}
              />
              <TextField
                name="Start"
                autoFocus
                margin="dense"
                id="name"
                label="Start"
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].start}
                onChange={handleInputEditExperience}
              />
              <TextField
                name="End"
                autoFocus
                margin="dense"
                id="name"
                label="End"
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].end}
                onChange={handleInputEditExperience}
              />
              <TextField
                name="Description"
                id="standard-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth
                variant="standard"
                defaultValue={data.candidate.experiences[editExprienceIdx].description}
                onChange={handleInputEditExperience}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Delete</Button>
              <Button onClick={createExperiene}>Submit</Button>
            </DialogActions>
          </Dialog>


          <Card sx={{ mb: 2 }}>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpen(1)}>
                  <AddIcon />
                </IconButton>
              }
              title="Experience"
            />
            {/* <CardActionArea>
              <CardHeader
                avatar={
                  <Avatar alt="Yamaha" src="https://www.adacgj.com/uploads/1/2/3/7/123777558/yamaha-icon-26_orig.jpg" />
                }
                title="Senior Software Engineer"
                subheader="Yamaha Inc."
              />
            </CardActionArea> */}
            {data.candidate.experiences.map((exp, idx) => {
                return(<div onClick={() => handleClickOpenEdit(idx, exp.id)}>
                  <ProfileInfoCard 
                    key = {idx}
                    company = {exp.company.title}
                    title = {exp.position.title}
                    location = {exp.location}
                    start = {exp.start}
                    end = {exp.end}
                  />
                  <Divider variant="inset"/>
                </div>)
            })}

            
            
            {/* company={data.candidate.experiences.company.title} */}
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
