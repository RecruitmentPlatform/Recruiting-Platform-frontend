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
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

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
// Candidate GQL Commands
const GET_CANDIDATE = gql`
  query GetCandidate($id:Int!){
    candidate(id:$id) {
      first
      last
      description
    }
  }`;
const UPDATE_CANDIDATE = gql`
mutation UpdateCandidate($id:Int!,$first:String!,$last:String!,$description:String){
  updateCandidate(id:$id,first:$first,last:$last,description:$description) {
    id
  }
}`;
// Experience GQL Commands
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
const ADD_EXPERIENCE = gql`
    mutation CreateExperience(
        $title:String!,
        $candidateId:Int!,
        $companyId:Int!,
        $startMonth:Int!,
        $startYear:Int!,
        $endMonth:Int,
        $endYear:Int,
        $employmentId:Int,
        $location:String,
        $description:String
      ) {
        createExperience(
          title:$title,
          candidateId:$candidateId,
          companyId:$companyId,
          startMonth:$startMonth,
          startYear:$startYear,
          endMonth:$endMonth,
          endYear:$endYear,
          employmentId:$employmentId,
          location:$location,
          description:$description
        ){
          id
        }}`;

const EDIT_EXPERIENCE = gql`
    mutation UpdateExperience(
        $id:Int,
        $title:String!,
        $candidateId:Int!,
        $companyId:Int!,
        $startMonth:Int!,
        $startYear:Int!,
        $endMonth:Int!,
        $endYear:Int!,
        $employmentId:Int!,
        $location:String!,
        $description:String!) {
        updateExperience(
          id:$id,
          title:$title,
          candidateId:$candidateId,
          companyId:$companyId,
          startMonth:$startMonth,
          startYear:$startYear,
          endMonth:$endMonth,
          endYear:$endYear,
          employmentId:$employmentId,
          location:$location,
          description:$description) {
              id
            }}`;

const DELETE_EXPERIENCE = gql`
    mutation DeleteExperience($id:Int!) {
      deleteExperience(id:$id) {
        success
      }
    }`;
// Education GQL Commands
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

// Skill GQL Commands
const GET_SKILLS = gql`
  query GetSkills($id:Int!){
    candidate(id:$id) {
      skills {
        title
        skilltype {
          title
        }
      }
    }
  }`;

const GET_ALL_SKILLS = gql`
  query GetAllSkills{
    skills {
      id
      title
    }
  }`;

const ADD_SKILL_TO_CANDIDATE = gql`
  mutation AddSkillToCandidate($id:Int!,$candidateId:Int!){
    addSkillToCandidate(id:$id,candidateId:$candidateId) {
      success
    }
  }
`;

const REMOVE_SKILL_FROM_CANDIDATE = gql`
  mutation RemoveSkillFromCandidate($id:Int!,$candidateId:Int!){
    removeSkillFromCandidate(id:$id,candidateId:$candidateId) {
      success
    }
  }
`;


// Employments SQL Commands
const GET_ALL_EMPLOYMENTS = gql`
  query GetAllEmployments {
    employments {
      id
      title
    }
  }`;
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

export default function Profile() {
  var { id } = useParams();
  id = parseInt(id);

  const [formExperienceData, setFormExperienceData] = useState({title:"", employmentId:"", companyId:"",location:"",startMonth:"",startYear:"",endMonth:"",endYear:"",description:""});


  const [openEditExperience, setOpenEditExperience] = useState(false);
  const [openEditSkill, setOpenEditSkill] = useState(false);
  const [openId, setOpenId] = useState();
  const [selectedSkillId, setSelectedSkillId] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [action, setAction] = useState("Add");

  // Edit Profile Dialog Options
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const handleClickOpenEditProfile = () => {
    setOpenEditProfile(true);
  };
  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };
  const handleSubmitProfile = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating

    updateCandidate({
      variables: {
        id: id,
        first: e.target.first.value,
        last: e.target.last.value,
        description: e.target.description.value
     }
   });
    //Close the dialog
    setOpenEditProfile(false);
    //Refresh the experience list
    refreshProfile();
  }
  // End Edit Profile Dialog Options


  const handleClickOpenExperience = (exp_list_index) => {

    // ID of Experience on Profile Page is set, Editing...
    if(exp_list_index != null){
      setOpenId(experiencesData.candidate.experiences[exp_list_index].id);
      setAction("Edit");

      setFormExperienceData({...formExperienceData,
        title:experiencesData.candidate.experiences[exp_list_index].title,
        companyId:experiencesData.candidate.experiences[exp_list_index].company.id,
        location:experiencesData.candidate.experiences[exp_list_index].location,
        startMonth:experiencesData.candidate.experiences[exp_list_index].startMonth,
        startYear:experiencesData.candidate.experiences[exp_list_index].startYear,
        endMonth:experiencesData.candidate.experiences[exp_list_index].endMonth,
        endYear:experiencesData.candidate.experiences[exp_list_index].endYear,
        description:experiencesData.candidate.experiences[exp_list_index].description}
      );
      if(experiencesData.candidate.experiences[exp_list_index].employment != null)
        setFormExperienceData({...formExperienceData,
          employmentId:experiencesData.candidate.experiences[exp_list_index].employment.id
        });
    // No ID set, create new experience
    }
    else {
      setOpenId();
      setAction("Add");
      setFormExperienceData({...formExperienceData, title:"", employmentId:"", companyId:"",location:"",startMonth:"",startYear:"",endMonth:"",endYear:"",description:""});
    }
    setOpenEditExperience(true);
  };
  const handleClickOpenSkill = () => {
    setOpenEditSkill(true);
  };
  const handleCloseEditExperience = () => {
    setOpenEditExperience(false);
  };
  const handleCloseEditSkill = () => {
    setOpenEditSkill(false);
  };

  const [refreshProfile, { loading:profileLoading, error:profileError, data:profileData }] = useLazyQuery(GET_CANDIDATE, {variables:{id}});
  const [refreshExperiences, { loading:experiencesLoading, data:experiencesData }] = useLazyQuery(GET_EXPERIENCES, {variables:{id},fetchPolicy: 'network-only'});
  const { loading:educationsLoading, data:educationsData } = useQuery(GET_EDUCATIONS, {variables:{id:1}});
  const [refreshSkills, { loading:skillsLoading, data:skillsData }] = useLazyQuery(GET_SKILLS, {variables:{id},fetchPolicy: 'network-only'});

  const { loading:allskillsLoading, data:allskillsData } = useQuery(GET_ALL_SKILLS);
  const { loading:allemploymentsLoading, data:allemploymentsData } = useQuery(GET_ALL_EMPLOYMENTS);

  useEffect(() => {
    refreshProfile();
    refreshExperiences();
    refreshSkills();
  }, []);

  const [updateCandidate] = useMutation(UPDATE_CANDIDATE);

  const [createExperience] = useMutation(ADD_EXPERIENCE);
  const [editExperience] = useMutation(EDIT_EXPERIENCE)
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE)

  /*const [createEducation] = useMutation(ADD_EDUCATION);
  const [editEducation] = useMutation(EDIT_EDUCATION)
  const [deleteEducation] = useMutation(DELETE_EDUCATION);*/

  const [addSkillToCandidate] = useMutation(ADD_SKILL_TO_CANDIDATE)
  const [removeSkillFromCandidate] = useMutation(REMOVE_SKILL_FROM_CANDIDATE);

  const handleSubmitExperience = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating
    if(openId != null) {
      editExperience({
        variables: {
          candidateId: 1,
          id: openId,
          title: e.target.title.value,
          employmentId: parseInt(e.target.employmentId.value),
          companyId: parseInt(e.target.companyId.value),
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
          candidateId: 1,
          title: e.target.title.value,
          employmentId: parseInt(e.target.employmentId.value),
          companyId: parseInt(e.target.companyId.value),
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
  const handleSubmitSkill = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating

    addSkillToCandidate({
      variables: {
        candidateId: id,
        id: parseInt(selectedSkillId),
     }
    });
    //Close the dialog
    setOpenEditSkill(false);
    //Refresh the experience list
    refreshSkills();
  }
  const handleRemoveSkill = (skill_id) =>{
    removeSkillFromCandidate({variables:{skill_id}});
    //Refresh the experience list
    refreshSkills();
  };

  if (profileLoading) return 'Loading experiences...';
  if (experiencesLoading) return 'Loading experiences...';
  if (educationsLoading) return 'Loading experiences...';
  if (skillsLoading) return 'Loading skills...';
  if (allskillsLoading) return 'Loading all skills...';
  if (allemploymentsLoading) return 'Loading all employments...';

  if (profileError) return `Error! ${profileError.message}`;

  return(
    <Container component="main">
      <Grid container sx={{ my: { xs: 2, md: 0 } }}>
        <Grid item md={6} xs={12} sx={{ mx: 'auto', mt:2}}>
          <Card sx={{ mb: 2 }}>
          <Dialog open={openEditProfile} onClose={handleCloseEditProfile}>
            <DialogTitle>Edit Profile</DialogTitle>
            <form onSubmit={handleSubmitProfile}>
              <DialogContent>
                <TextField
                  size="small"
                  name="first"
                  label="First Name"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  defaultValue={profileData.candidate.first}
                />
                <TextField
                  size="small"
                  name="last"
                  label="Last Name"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  defaultValue={profileData.candidate.last}
                />
                <TextField
                  size="small"
                  name="description"
                  label="Description"
                  margin="dense"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  defaultValue={profileData.candidate.description}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditProfile}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </Dialog>
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
            action={<IconButton aria-label="settings" onClick = {() => handleClickOpenEditProfile()}>
                      <EditIcon />
                    </IconButton>}
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
                  required
                  size="small"
                  type="number"
                  name="companyId"
                  margin="dense"
                  id="name"
                  label="Company"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.companyId}
                />
                <TextField
                  required
                  size="small"
                  name="title"
                  margin="dense"
                  label="Title"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.title}
                />
                <TextField
                  select
                  size="small"
                  margin="dense"
                  fullWidth
                  name="employmentId"
                  label="Employment Type"
                  defaultValue={formExperienceData.employmentId?formExperienceData.employmentId:null}
                >
                  {allemploymentsData.employments.map((employment,eid) => (
                  <MenuItem
                    key={eid}
                    value={employment.id}
                  >
                    {employment.title}
                  </MenuItem>
                   ))}
                </TextField>
                <TextField
                  size="small"
                  name="location"
                  margin="dense"
                  id="name"
                  label="Locaton"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.location}
                />
                <Divider sx={{my:2}} />
                <TextField
                  required
                  size="small"
                  select
                  name="startMonth"
                  margin="dense"
                  id="name"
                  label="Start Month"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.startMonth}
                >
                  {months.map((month,mid) => (
                  <MenuItem
                    key={mid}
                    value={mid+1}
                  >
                    {month}
                  </MenuItem>
                   ))}
                </TextField>
                <TextField
                  required
                  size="small"
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
                  select
                  size="small"
                  name="endMonth"
                  margin="dense"
                  id="name"
                  label="End Month"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.endMonth}
                >
                  {months.map((month,mid) => (
                  <MenuItem
                    key={mid}
                    value={mid+1}
                  >
                    {month}
                  </MenuItem>
                   ))}
                </TextField>
                <TextField
                  size="small"
                  type="number"
                  name="endYear"
                  margin="dense"
                  id="name"
                  label="End Year"
                  fullWidth
                  variant="outlined"
                  defaultValue={formExperienceData.endYear}
                />
                <Divider sx={{my:2}} />
                <TextField
                  size="small"
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
                {action=='Edit'?<Button onClick={handleDeleteExperience}>Delete</Button>:null}
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Card sx={{ mb: 2 }}>
            <CardHeader sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenExperience()}>
                  <AddIcon />
                </IconButton>
              }
              title=<Typography sx={{fontWeight:'bold'}} component="h2" variant="h6">
                Experience
              </Typography>
            />
            {console.log(experiencesData)}
            {experiencesData.candidate.experiences.map((exp, exp_list_index) => {
                return(<div onClick={() => handleClickOpenExperience(exp_list_index)}>
                  <ExperienceCard
                    key = {exp_list_index}
                    title = {exp.title}
                    employment = {exp.employment?exp.employment.title:null}
                    company = {exp.company.title}
                    location = {exp.location}
                    startMonth = {exp.startMonth}
                    startYear = {exp.startYear}
                    endMonth = {exp.endMonth}
                    endYear = {exp.endYear}
                    description = {exp.description}
                  />
                  <Divider variant="inset"/>
                </div>)
            })}
          </Card>

          <Dialog open={openEditSkill} onClose={handleCloseEditSkill}>
            <DialogTitle>Add Skill</DialogTitle>
            <form onSubmit={handleSubmitSkill}>
              <DialogContent>
                <Autocomplete
                  disablePortal
                  name="skill_id"
                  options={allskillsData.skills.map((skill) => {
                    return {label:skill.title,id:skill.id};
                  })}
                  sx={{ width: 300 }}
                  onChange = {(event, value) => setSelectedSkillId(value.id)}
                  renderInput={(params) => <TextField {...params} label="Skill" />}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Card>
            <CardHeader  sx={{ pb: 0 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenSkill()}>
                  <AddIcon />
                </IconButton>
              }
              title="Skills"
            />
            <CardContent>
              <Stack direction="row" spacing={1}>
                {skillsData?
                  skillsData.candidate.skills.map((skill, skill_list_index) => {
                    return(<Chip key = {skill_list_index} label={skill.title} />)
                  })
                  :"No skills selected"}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>);
}
