import {React, Fragment, useState, useEffect} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Chip from '@mui/material/Chip';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import ExperienceCard from "../Card/ExperienceCard";

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
          }
        }`;
const GET_EXPERIENCES = gql`
  query GetExperiences($id:Int!){
        candidate(id:$id) {
          experiences {
            id
            title
            startMonth
            startYear
            endMonth
            endYear
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
          }
        }
      }`;

const GET_EDUCATIONS = gql`
  query GetEducations($id:Int!){
        candidate(id:$id) {
            educations {
              id
              startMonth
              startYear
              endMonth
              endYear
              description
              college {
                id
                title
              }
              degree {
                title
              }
            }
          }
        }`;
const GET_SKILLS = gql`
  query GetSkills($id:Int!){
        candidate(id:$id) {
          skills {
            title
            skilltypeId
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
    mutation UpdateExperience($id:Int, $location:String, $companyId:Int, $categoryId:Int, $description:String, $employmentId:Int) {
        updateExperience(id:$id, location:$location, companyId: $companyId, categoryId: $categoryId, description:$description, employmentId:$employmentId) {
              id
            }}`;

const DELETE_EXPERIENCE = gql`
    mutation DeleteExperience($id:Int!) {
      deleteExperience(id:$id) {
        success
      }
    }`;

export default function Profile() {
  var { id } = useParams();
  id = parseInt(id);

  const [formExperienceData, setFormExperienceData] = useState({title:"", employmentId:"", companyName:"",location:"",start:"",end:"", description:""})

  // Define default values of state variables for later updating
    // Modal data
  const [openEditExperience, setOpenEditExperience] = useState(false);
  const [openId, setOpenId] = useState();
    // Dialog
  const [action, setAction] = useState("Add");

  const handleClickOpenExperience = (exp_list_index) => {

    // ID of Experience on Profile Page is set, Editing...
    if(exp_list_index != null){
      setOpenId(experiencesData.candidate.experiences[exp_list_index].id);
      setAction("Edit");

      setFormExperienceData({...formExperienceData,
        title:experiencesData.candidate.experiences[exp_list_index].position.title,
        employmentId:experiencesData.candidate.experiences[exp_list_index].employment.id,
        companyName:experiencesData.candidate.experiences[exp_list_index].company.title,
        location:experiencesData.candidate.experiences[exp_list_index].location,
        start:experiencesData.candidate.experiences[exp_list_index].start,
        end:experiencesData.candidate.experiences[exp_list_index].end,
        description:experiencesData.candidate.experiences[exp_list_index].description}
      );
    }
    // No ID set, create new experience
    else {
      setOpenId();
      setAction("Add");
      setFormExperienceData({...formExperienceData, title:"", employmentId:"", companyName:"",location:"",start:"",end:"", description:""});
    }
    setOpenEditExperience(true);
  };
  const handleCloseEditExperience = () => {
    setOpenEditExperience(false);
  };

  const { loading:profileLoading, error:profileError, data:profileData } = useQuery(GET_PROFILE, {variables:{id}});
  const [refreshExperiences, { loading:experiencesLoading, data:experiencesData }] = useLazyQuery(GET_EXPERIENCES, {variables:{id},fetchPolicy: 'network-only'});
  const { loading:educationsLoading, data:educationsData } = useQuery(GET_EDUCATIONS, {variables:{id:1}});
  const [refreshSkills, { loading:skillsLoading, data:skillsData }] = useLazyQuery(GET_SKILLS, {variables:{id},fetchPolicy: 'network-only'});

  useEffect(() => {
    refreshExperiences();
    refreshSkills();
  }, []);

  const [createExperience, {loading:createExperienceLoading, error:createExperienceError}] = useMutation(ADD_EXPERIENCE);
  const [editExperience, {loading3, error3}] = useMutation(EDIT_EXPERIENCE)
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE)

  const handleSubmitExperience = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating
    if(openId != null) {
      editExperience({
        variables: {
          id: openId,
          employmentId: parseInt(e.target.employmentId.value),
          companyId: parseInt(e.target.companyName.value),
          position: e.target.position.value,
          location: e.target.location.value,
          startMonth: parseInt(e.target.startMonth.value),
          startYear: parseInt(e.target.startYear.value),
          endMonth: parseInt(e.target.endMonth.value),
          endYear: parseInt(e.target.endYear.value),
          description: e.target.description.value
       }
     });
    }
    // No ID set, add new experience
    else {
      createExperience({
        variables: {
          employmentId: parseInt(e.target.employmentId.value),
          companyId: parseInt(e.target.companyName.value),
          position: e.target.position.value,
          location: e.target.location.value,
          startMonth: parseInt(e.target.startMonth.value),
          startYear: parseInt(e.target.startYear.value),
          endMonth: parseInt(e.target.endMonth.value),
          endYear: parseInt(e.target.endYear.value),
          description: e.target.description.value
       }
     });
    }
    //Close the dialog
    setOpenEditExperience(false);
    //Refresh the experience list
    refreshExperiences();
  }
  const handleDeleteExperience = () =>{
    deleteExperience({variables:{id:openId}});
    //Close the dialog
    setOpenEditExperience(false);
    //Refresh the experience list
    refreshExperiences();
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  if (profileLoading) return 'Loading experiences...';
  if (experiencesLoading) return 'Loading experiences...';
  if (educationsLoading) return 'Loading experiences...';
  if (skillsLoading) return 'Loading skills...';

  if (profileError) return `Error! ${profileError.message}`;

  return(
    <Container component="main">
      <Grid container sx={{ my: { xs: 2, md: 0 } }}>
        <Grid item md={6} sx={{ mx: 'auto', mt:2}}>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random"
              alt="image alt"
            />
            <CardHeader
            avatar={
              <Avatar {...stringAvatar(profileData.candidate.first+" "+profileData.candidate.last)} />
            }
            title={profileData.candidate.first+" "+profileData.candidate.last}
            subheader="Engineer at Facebook"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {profileData.candidate.description}
              </Typography>
            </CardContent>
          </Card>

          <Dialog open={openEditExperience} onClose={handleCloseEditExperience}>
            <DialogTitle>{action} Experience</DialogTitle>
            <form onSubmit={handleSubmitExperience}>
              <DialogContent>
                <TextField
                  name="title"
                  margin="dense"
                  label="Title"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.title}
                />
                <TextField
                  type="number"
                  name="employmentId"
                  margin="dense"
                  id="name"
                  label="Employment Type"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.employmentId}
                />
                <TextField
                  type="number"
                  name="companyId"
                  margin="dense"
                  id="name"
                  label="Company"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.companyName}
                />
                <TextField
                  name="location"
                  margin="dense"
                  id="name"
                  label="Locaton"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.location}
                />
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {months.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  type="select"
                  name="startMonth"
                  margin="dense"
                  id="name"
                  label="Start Month"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.startMonth}
                />
                <TextField
                  type="number"
                  name="startYear"
                  margin="dense"
                  id="name"
                  label="Start Year"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.startYear}
                />
                <TextField
                  type="select"
                  name="endMonth"
                  margin="dense"
                  id="name"
                  label="End Month"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.endMonth}
                />
                <TextField
                  type="number"
                  name="startYear"
                  margin="dense"
                  id="name"
                  label="End Year"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.endYear}
                />
                <TextField
                  type="number"
                  name="end"
                  margin="dense"
                  id="name"
                  label="End"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.end}
                />
                <TextField
                  name="description"
                  id="standard-multiline-static"
                  label="Description"
                  margin="dense"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.description}
                />
              </DialogContent>
              <DialogActions>
                {action=='edit'?<Button onClick={handleDeleteExperience}>Delete</Button>:null}
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Card sx={{ mb: 2 }}>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenExperience()}>
                  <AddIcon />
                </IconButton>
              }
              title="Experience"
            />
            {experiencesData.candidate.experiences.map((exp, exp_list_index) => {
                return(<div onClick={() => handleClickOpenExperience(exp_list_index)}>
                  <ExperienceCard
                    key = {exp_list_index}
                    company = {exp.company.title}
                    title = {exp.position.title}
                    location = {exp.location}
                    start = {exp.start}
                    end = {exp.end}
                    description = {exp.description}
                  />
                  <Divider variant="inset"/>
                </div>)
            })}
          </Card>
          <Card>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" /*onClick = {() => handleExperienceOpen()}*/>
                  <AddIcon />
                </IconButton>
              }
              title="Skills"
            />
            <CardContent>
              <Stack direction="row" spacing={1}>
                {skillsData?skillsData.candidate.skills.map((skill, skill_list_index) => {
                    return(<div onClick={() => handleClickOpenExperience(skill_list_index)}>
                      <Chip key = {skill_list_index} label={skill.title} />
                    </div>)
                }):"No skills selected"}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>);
}
