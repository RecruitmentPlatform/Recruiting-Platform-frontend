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
import PublicIcon from '@mui/icons-material/Public';

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
import JobListCard from "../Card/JobListCard";
import PostCard from "../Card/PostCard";

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
      headline
      location
      description
      genderId
      gender {
        title
      }
      pronounId
      pronoun {
        title
      }
      ethnicityId
      ethnicity {
        title
      }
    }
  }`;
const UPDATE_CANDIDATE = gql`
mutation UpdateCandidate($id:Int!,$first:String!,$last:String!,$headline:String,$location:String,$description:String, $genderId: Int, $pronounId: Int, $ethnicityId: Int){
  updateCandidate(id:$id,first:$first,last:$last,headline:$headline,location:$location,description:$description,genderId: $genderId, pronounId: $pronounId, ethnicityId: $ethnicityId) {
    id
  }
}`;
const GET_ALL_GENDERS = gql`
  query GetAllGenders{
    genders{
      id
      title
    }
  }`;
const GET_ALL_ETHNICITIES = gql`
  query GetAllEthnicities{
    ethnicities {
      id
      title
    }
  }`;
const GET_ALL_PRONOUNS = gql`
  query GetAllPronouns{
    pronouns {
      id
      title
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
        $endMonth:Int,
        $endYear:Int,
        $employmentId:Int,
        $location:String,
        $description:String) {
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
        candidateId
        collegeName
        majorName
        collegeId
        degreeId
        degree {
          title
        }
        startMonth
        startYear
        endMonth
        endYear
        description
      }
    }
  }`;

const ADD_EDUCATION = gql`
    mutation CreateEducation(
      $candidateId:Int!,
      $collegeName:String!,
      $collegeId:Int,
      $degreeId:Int,
      $majorName:String,
      $startMonth:Int,
      $startYear:Int,
      $endMonth:Int,
      $endYear:Int,
      $description:String
      ) {
        createEducation(
          candidateId:$candidateId,
          collegeName:$collegeName,
          collegeId:$collegeId,
          majorName:$majorName
          degreeId:$degreeId,
          startMonth:$startMonth,
          startYear:$startYear,
          endMonth:$endMonth,
          endYear:$endYear,
          description:$description
        ){
          id
        }}`;

const EDIT_EDUCATION = gql`
    mutation UpdateEducation(
        $id:Int,
        $candidateId:Int!,
        $collegeName:String!,
        $collegeId:Int,
        $majorName:String,
        $degreeId:Int,
        $startMonth:Int,
        $startYear:Int,
        $endMonth:Int,
        $endYear:Int,
        $description:String
        ) {
        updateEducation(
          id:$id,
          candidateId:$candidateId,
          collegeName:$collegeName,
          collegeId:$collegeId,
          majorName:$majorName
          degreeId:$degreeId,
          startMonth:$startMonth,
          startYear:$startYear,
          endMonth:$endMonth,
          endYear:$endYear,
          description:$description
          ) {
              id
            }}`;
const DELETE_EDUCATION = gql`
    mutation DeleteEducation($id:Int!) {
      deleteEducation(id:$id) {
        success
      }
    }`;
// Job Post GQL Commands
const GET_CANDIDATE_OPENINGS = gql`
  query GetCandidateOpenings($id:Int!){
    candidate(id:$id) {
      openings {
        id
        title
        description
        location
        salaryLow
        salaryHigh
        startMonth
        startYear
        company {
          title
        }
        employment {
          title
        }
      }
    }
  }`;

// Post GQL Commands
const GET_CANDIDATE_POSTS = gql`
  query GetCandidatePosts($id:Int!){
    candidate(id:$id) {
      posts {
        id
        date
        status
        content
        opening {
          id
          title
          description
          companyId
          location
          employment {
            title
          }
          company{
            title
          }
        }
      }
    }
  }`;

const ADD_POST = gql`
  mutation AddPost($candidateId:Int!,$date:Int!,$status:Int!,$content:String!,$openingId:Int) {
    createPost(candidateId:$candidateId,date:$date,status:$status,content:$content,openingId:$openingId) {
      id
    }
  }`;

const DELETE_POST = gql`
  mutation DeletePost($id:Int!) {
    deletePost(id:$id) {
      success
    }
  }`;

// Skill GQL Commands
const GET_SKILLS = gql`
  query GetSkills($id:Int!){
    candidate(id:$id) {
      skills {
        id
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

// Companies GQL Commands
const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    companies {
      id
      title
    }
  }`;

// Companies GQL Commands
const GET_ALL_COLLEGES = gql`
  query GetAllColleges {
    colleges {
      id
      title
    }
  }`;
// Degrees Commands
const GET_ALL_DEGREES = gql`
  query GetAllDegrees {
    degrees {
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
  const uid = +sessionStorage.getItem("uid");
  var { id } = useParams();
  id = parseInt(id);

  const [formExperienceData, setFormExperienceData] = useState({title:"", employmentId:"", companyId:"",location:"",startMonth:"",startYear:"",endMonth:"",endYear:"",description:""});

  const [formEducationData, setFormEducationData] = useState({collegeId:"", collegeName:"", degreeId:"",majorName:"",startMonth:"",startYear:"",endMonth:"",endYear:"",description:""});


  const [openEditExperience, setOpenEditExperience] = useState(false);
  const [openEditEducation, setOpenEditEducation] = useState(false);
  const [openEditSkill, setOpenEditSkill] = useState(false);
  const [openId, setOpenId] = useState();
  const [selectedSkillId, setSelectedSkillId] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedCollegeId, setSelectedCollegeId] = useState();
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
        headline: e.target.headline.value,
        location: e.target.location.value,
        description: e.target.description.value,
        genderId: parseInt(e.target.genderId.value),
        pronounId: parseInt(e.target.pronounId.value),
        ethnicityId: parseInt(e.target.ethnicityId.value)
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
          title:experiencesData.candidate.experiences[exp_list_index].title,
          employmentId:experiencesData.candidate.experiences[exp_list_index].employment.id,
          companyId:experiencesData.candidate.experiences[exp_list_index].company.id,
          location:experiencesData.candidate.experiences[exp_list_index].location,
          startMonth:experiencesData.candidate.experiences[exp_list_index].startMonth,
          startYear:experiencesData.candidate.experiences[exp_list_index].startYear,
          endMonth:experiencesData.candidate.experiences[exp_list_index].endMonth,
          endYear:experiencesData.candidate.experiences[exp_list_index].endYear,
          description:experiencesData.candidate.experiences[exp_list_index].description
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
  const handleClickOpenEducation = (edu_list_index) => {

    // ID of education on Profile Page is set, Editing...
    if(edu_list_index != null){
      setOpenId(educationsData.candidate.educations[edu_list_index].id);
      setAction("Edit");

      setFormEducationData({...formEducationData,
        collegeName:educationsData.candidate.educations[edu_list_index].collegeName,
        degreeId:educationsData.candidate.educations[edu_list_index].degreeId,
        majorName:educationsData.candidate.educations[edu_list_index].majorName,
        startMonth:educationsData.candidate.educations[edu_list_index].startMonth,
        startYear:educationsData.candidate.educations[edu_list_index].startYear,
        endMonth:educationsData.candidate.educations[edu_list_index].endMonth,
        endYear:educationsData.candidate.educations[edu_list_index].endYear,
        description:educationsData.candidate.educations[edu_list_index].description}
      );
      if(educationsData.candidate.educations[edu_list_index].collegeId != null)
        setFormEducationData({...formEducationData,
          collegeName:educationsData.candidate.educations[edu_list_index].collegeName,
          collegeId:educationsData.candidate.educations[edu_list_index].collegeId,
          degreeId:educationsData.candidate.educations[edu_list_index].degreeId,
          majorName:educationsData.candidate.educations[edu_list_index].majorName,
          startMonth:educationsData.candidate.educations[edu_list_index].startMonth,
          startYear:educationsData.candidate.educations[edu_list_index].startYear,
          endMonth:educationsData.candidate.educations[edu_list_index].endMonth,
          endYear:educationsData.candidate.educations[edu_list_index].endYear,
          description:educationsData.candidate.educations[edu_list_index].description
        });
    // No ID set, create new education
    }
    else {
      setOpenId();
      setAction("Add");
      setFormEducationData({...formEducationData, collegeId:"", collegeName:"", degreeId:"",majorName:"",startMonth:"",startYear:"",endMonth:"",endYear:"",description:""});
    }
    setOpenEditEducation(true);
  };
  const handleClickOpenSkill = () => {
    setOpenEditSkill(true);
  };
  const handleCloseEditExperience = () => {
    setOpenEditExperience(false);
  };
  const handleCloseEditEducation = () => {
    setOpenEditEducation(false);
  };
  const handleCloseEditSkill = () => {
    setOpenEditSkill(false);
  };

  const [refreshProfile, { loading:profileLoading, error:profileError, data:profileData }] = useLazyQuery(GET_CANDIDATE, {variables:{id}});
  const { data:openingsData, loading:openingsLoading } = useQuery(GET_CANDIDATE_OPENINGS, {variables:{id}});
  const [refreshExperiences, { loading:experiencesLoading, data:experiencesData }] = useLazyQuery(GET_EXPERIENCES, {variables:{id},fetchPolicy: 'network-only'});
  const [refreshEducations, { loading:educationsLoading, data:educationsData }] = useLazyQuery(GET_EDUCATIONS, {variables:{id},fetchPolicy: 'network-only'});
  const [refreshSkills, { loading:skillsLoading, data:skillsData }] = useLazyQuery(GET_SKILLS, {variables:{id},fetchPolicy: 'network-only'});
  const [refreshPosts, { loading:postsLoading, data:postsData }] = useLazyQuery(GET_CANDIDATE_POSTS, {variables:{id},fetchPolicy: 'network-only'});

  const { loading:allskillsLoading, data:allskillsData } = useQuery(GET_ALL_SKILLS);
  const { loading:allemploymentsLoading, data:allemploymentsData } = useQuery(GET_ALL_EMPLOYMENTS);

  const { loading:allgendersLoading, data:allgendersData } = useQuery(GET_ALL_GENDERS);
  const { loading:allpronounsLoading, data:allpronounsData } = useQuery(GET_ALL_PRONOUNS);
  const { loading:allethnicitiesLoading, data:allethnicitiesData } = useQuery(GET_ALL_ETHNICITIES);
  const { loading:allcompaniesLoading, data:allcompaniesData } = useQuery(GET_ALL_COMPANIES);
  const { loading:allcollegesLoading, data:allcollegesData } = useQuery(GET_ALL_COLLEGES);
  const { loading:alldegreesLoading, data:alldegreesData } = useQuery(GET_ALL_DEGREES);

  useEffect(() => {
    refreshProfile();
    refreshExperiences();
    refreshEducations();
    refreshSkills();
    refreshPosts();
  }, []);

  const [updateCandidate] = useMutation(UPDATE_CANDIDATE);
  const [createExperience] = useMutation(ADD_EXPERIENCE);
  const [editExperience] = useMutation(EDIT_EXPERIENCE)
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE)

  const [createEducation] = useMutation(ADD_EDUCATION);
  const [editEducation] = useMutation(EDIT_EDUCATION);
  const [deleteEducation] = useMutation(DELETE_EDUCATION);

  const [createPost] = useMutation(ADD_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const [addSkillToCandidate] = useMutation(ADD_SKILL_TO_CANDIDATE)
  const [removeSkillFromCandidate] = useMutation(REMOVE_SKILL_FROM_CANDIDATE);

  const handleSubmitExperience = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating
    if(openId != null) {
      editExperience({
        variables: {
          candidateId: id,
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
          candidateId: id,
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
  const handleSubmitPost = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating

    createPost({
      variables: {
        candidateId: id,
        date: 123,
        status: 1,
        content: e.target.content.value,
        openingId: parseInt(e.target.openingId.value),
     }
   });
    //Refresh the posts list
    refreshPosts();
  };
  const handleDeleteExperience = () =>{
    deleteExperience({variables:{id:openId}});
    //Close the dialog
    setOpenEditExperience(false);
    //Refresh the experience list
    refreshExperiences();
  };
  const handleSubmitEducation = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating
    if(openId != null) {
      editEducation({
        variables: {
          candidateId: id,
          id: openId,
          collegeName: e.target.collegeName.value,
          collegeId: selectedCollegeId,
          degreeId: parseInt(e.target.degreeId.value),
          majorName:  e.target.majorName.value,
          startMonth: parseInt(e.target.startMonth.value),
          startYear: parseInt(e.target.startYear.value),
          endMonth: parseInt(e.target.endMonth.value),
          endYear: parseInt(e.target.endYear.value),
          description: e.target.description.value
       }
     });
    }
    // No ID set, add new education
    else {
      createEducation({
        variables: {
          candidateId: id,
          collegeName: e.target.collegeName.value,
          collegeId: selectedCollegeId,
          degreeId: parseInt(e.target.degreeId.value),
          majorName:  e.target.majorName.value,
          startMonth: parseInt(e.target.startMonth.value),
          startYear: parseInt(e.target.startYear.value),
          endMonth: parseInt(e.target.endMonth.value),
          endYear: parseInt(e.target.endYear.value),
          description: e.target.description.value
       }
     });
    }
    //Close the dialog
    setOpenEditEducation(false);
    //Refresh the education list
    refreshEducations();
  }
  const handleDeleteEducation = () =>{
    deleteEducation({variables:{id:openId}});
    //Close the dialog
    setOpenEditEducation(false);
    //Refresh the education list
    refreshEducations();
  };
  const handleRemoveSkill = (skill_id) => {
    removeSkillFromCandidate({variables:{id:skill_id,candidateId:id}})
    refreshSkills();
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
    //setOpenEditSkill(false);
    //Refresh the experience list
    refreshSkills();
  };

  if (profileLoading) return 'Loading experiences...';
  if (postsLoading) return 'Loading posts...';
  if (openingsLoading) return 'Loading...';
  if (experiencesLoading) return 'Loading experiences...';
  if (educationsLoading) return 'Loading experiences...';
  if (skillsLoading) return 'Loading skills...';
  if (allskillsLoading) return 'Loading all skills...';
  if (allemploymentsLoading) return 'Loading all employments...';

  if (profileError) return `Error! ${profileError.message}`;

  return(
    <Container component="main">
      <Grid container>
        <Grid item md={6} xs={12} sx={{ mx: 'auto', mt:2}}>
          <Card sx={{ mb: 2 }}>
            <Dialog open={openEditProfile} onClose={handleCloseEditProfile}>
              <DialogTitle>Edit Profile</DialogTitle>
              <form onSubmit={handleSubmitProfile}>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        size="small"
                        name="first"
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        defaultValue={profileData.candidate.first}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        size="small"
                        name="last"
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        defaultValue={profileData.candidate.last}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        name="headline"
                        label="Headline"
                        fullWidth
                        variant="outlined"
                        defaultValue={profileData.candidate.headline}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        name="location"
                        label="Location"
                        fullWidth
                        variant="outlined"
                        defaultValue={profileData.candidate.location}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        select
                        size="small"
                        fullWidth
                        name="genderId"
                        label="Gender Identity"
                        defaultValue={profileData.candidate.genderId?profileData.candidate.genderId:null}
                      >
                        {allgendersData.genders.map((gender,eid) => (
                        <MenuItem
                          key={eid}
                          value={gender.id}
                        >
                          {gender.title}
                        </MenuItem>
                         ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        select
                        size="small"
                        fullWidth
                        name="pronounId"
                        label="Gender Pronoun"
                        defaultValue={profileData.candidate.pronounId?profileData.candidate.pronounId:null}
                      >
                        {allpronounsData.pronouns.map((pronoun,eid) => (
                        <MenuItem
                          key={eid}
                          value={pronoun.id}
                        >
                          {pronoun.title}
                        </MenuItem>
                         ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        select
                        size="small"
                        fullWidth
                        name="ethnicityId"
                        label="Ethnicity"
                        defaultValue={profileData.candidate.ethnicityId?profileData.candidate.ethnicityId:null}
                      >
                        {allethnicitiesData.ethnicities.map((ethnicity,eid) => (
                        <MenuItem
                          key={eid}
                          value={ethnicity.id}
                        >
                          {ethnicity.title}
                        </MenuItem>
                         ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        defaultValue={profileData.candidate.description}
                      />
                    </Grid>
                  </Grid>
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
            title=<Typography component="h1" sx={{fontSize:'15px'}}>{profileData.candidate.first+" "+profileData.candidate.last}
                    {profileData.candidate.pronoun.title?
                    <Typography sx={{ml:0.5,fontSize:'13px'}} variant="span" color="text.secondary">
                      ({profileData.candidate.pronoun.title})
                    </Typography>:null}
                  </Typography>
            subheader={profileData.candidate.headline}
            action={<IconButton aria-label="settings" onClick = {() => handleClickOpenEditProfile()}>
                      <EditIcon />
                    </IconButton>}
            />
            {profileData.candidate.description || profileData.candidate.location ?
              <CardContent sx={{pt:0}}>
                {profileData.candidate.location?
                <Typography alignItems='center' sx={{display:'flex'}} variant="body2" color="text.secondary">
                  <PublicIcon/>{profileData.candidate.location}
                </Typography>
                : null}
                {profileData.candidate.description?
                <Typography variant="body2" color="text.secondary">
                  {profileData.candidate.description}
                </Typography>
                : null}
              </CardContent>
            :null}
          </Card>

          <Card sx={{ mb:2 }}>
            <form onSubmit={handleSubmitPost}>
              <CardContent sx={{pb:0}}>
                <Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                  Create post
                </Typography>
                <TextField
                  required
                  label="What's on your mind?"
                  multiline
                  rows={4}
                  variant="standard"
                  fullWidth
                  name="content"
                />
              </CardContent>
              <CardActions sx={{px:2, pb:1}}>
                {openingsData?
                  <TextField
                    select
                    name="openingId"
                    size="small"
                    label="Share an Opening"
                    sx={{width:'100%', maxWidth:'250px', mr:1}}
                  >
                    {openingsData.candidate.openings.map((opening, openingid) => (
                      <MenuItem
                        key={openingid}
                        value={opening.id}
                      >
                        {opening.title}
                      </MenuItem>
                    ))}
                  </TextField>
                :null}
                <Button variant="contained" sx={{ml:'auto'}} type="submit">Post</Button>
              </CardActions>
            </form>
          </Card>

          {postsData.candidate.posts.map((post, postid) => {return (<div>
            <PostCard
              key = {postid}
              id = {post.id}
              name = {profileData.candidate.first+" "+profileData.candidate.last}
              date = {post.date}
              content = {post.content}
              openingId = {post.opening?post.opening.id:null}
              job_title = {post.opening?post.opening.title:null}
              job_description = {post.opening?post.opening.description:null}
              job_company = {post.opening?post.opening.company.title:null}
              job_location = {post.opening?post.opening.location:null}
              job_employment = {post.opening?post.opening.employment?post.opening.employment.title:null:null}
               />
          </div>)})}

          {openingsData?
            <Card sx={{ mb: 2 }}>
              <CardHeader sx={{py:1}}
                title=<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                  Job Postings
                </Typography>
              />
              {openingsData.candidate.openings.map((o, openingid) => {return (<div>
                {openingid > 0?
                  <Divider variant="inset"/>
                  :null}
                <JobListCard
                  key = {openingid}
                  id = {o.id}
                  title = {o.title}
                  description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
                  company = {o.company.title}
                  first = {profileData.candidate.first}
                  last = {profileData.candidate.last}
                  location = {o.location}
                  salaryLow = {o.salaryLow}
                  salaryHigh = {o.salaryHigh}
                  employment = {o.employment.title}
                   />
              </div>)})}
            </Card>
            :null
          }

          <Dialog open={openEditExperience} onClose={handleCloseEditExperience}>
            <DialogTitle>{action} Experience</DialogTitle>
            <form onSubmit={handleSubmitExperience}>
              <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      required
                      size="small"
                      type="number"
                      name="companyId"
                      id="name"
                      label="Company"
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.companyId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      size="small"
                      name="title"
                      label="Title"
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      size="small"
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      name="location"
                      id="name"
                      label="Locaton"
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      size="small"
                      select
                      name="startMonth"
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      size="small"
                      type="number"
                      name="startYear"
                      id="name"
                      label="Start Year"
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.startYear}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      size="small"
                      name="endMonth"
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      type="number"
                      name="endYear"
                      id="name"
                      label="End Year"
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.endYear}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      name="description"
                      id="standard-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      defaultValue={formExperienceData.description}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                {action=='Edit'?<Button onClick={handleDeleteExperience}>Delete</Button>:null}
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Card sx={{ mb: 2 }}>
            <CardHeader sx={{py:1}}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenExperience()}>
                  <AddIcon />
                </IconButton>
              }
              title=<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                Experience
              </Typography>
            />
            {experiencesData.candidate.experiences.map((exp, exp_list_index) => {
                return(<div onClick={() => handleClickOpenExperience(exp_list_index)}>
                {exp_list_index > 0?
                  <Divider variant="inset"/>
                  :null}
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
                </div>)
            })}
          </Card>

          <Dialog open={openEditEducation} onClose={handleCloseEditEducation}>
            <DialogTitle>{action} Education</DialogTitle>
            <form onSubmit={handleSubmitEducation}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      defaultValue={{label:formEducationData.collegeName,id:formEducationData.collegeId}}
                      size="small"
                      clearOnBlur={false}
                      name="collegeId"
                      options={allcollegesData.colleges.map((college) => {
                        return {label:college.title,id:college.id};
                      })}
                      fullWidth
                      /*onChange = {(event, value) => setSelectedCollegeId(value.id)}*/
                      renderInput={(params) => <TextField required {...params} name="collegeName" label="College" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      size="small"
                      fullWidth
                      name="majorName"
                      label="Major"
                      defaultValue={formEducationData.majorName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      name="degreeId"
                      label="Degree"
                      defaultValue={formEducationData.degreeId?formEducationData.degreeId:null}
                    >
                      {alldegreesData.degrees.map((degree,did) => (
                      <MenuItem
                        key={did}
                        value={degree.id}
                      >
                        {degree.title}
                      </MenuItem>
                       ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      size="small"
                      select
                      name="startMonth"
                      id="name"
                      label="Start Month"
                      fullWidth
                      variant="outlined"
                      defaultValue={formEducationData.startMonth}
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      size="small"
                      type="number"
                      name="startYear"
                      id="name"
                      label="Start Year"
                      fullWidth
                      variant="outlined"
                      defaultValue={formEducationData.startYear}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      size="small"
                      name="endMonth"
                      id="name"
                      label="End Month"
                      fullWidth
                      variant="outlined"
                      defaultValue={formEducationData.endMonth}
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      type="number"
                      name="endYear"
                      id="name"
                      label="End Year"
                      fullWidth
                      variant="outlined"
                      defaultValue={formEducationData.endYear}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      name="description"
                      id="standard-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      defaultValue={formEducationData.description}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                {action=='Edit'?<Button onClick={handleDeleteEducation}>Delete</Button>:null}
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Card sx={{ mb: 2 }}>
            <CardHeader sx={{py:1}}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenEducation()}>
                  <AddIcon />
                </IconButton>
              }
              title=<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                Education
              </Typography>
            />
            {educationsData.candidate.educations.map((edu, edu_list_index) => {
                return(<div onClick={() => handleClickOpenEducation(edu_list_index)}>
                {edu_list_index > 0?
                  <Divider variant="inset"/>
                  :null}
                  <ExperienceCard
                    key = {edu_list_index}
                    title = {edu.majorName}
                    company = {edu.collegeName}
                    employment = {edu.degree.title}
                    startMonth = {edu.startMonth}
                    startYear = {edu.startYear}
                    endMonth = {edu.endMonth}
                    endYear = {edu.endYear}
                    description = {edu.description}
                  />
                </div>)
            })}
          </Card>

          <Dialog open={openEditSkill} onClose={handleCloseEditSkill}>
            <DialogTitle>Add Skill</DialogTitle>
            <form onSubmit={handleSubmitSkill}>
              <DialogContent>
                <Autocomplete
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

          <Card sx={{mb:2}}>
            <CardHeader sx={{ pb: 0, pt:1 }}
              action={
                <IconButton aria-label="edit" onClick = {() => handleClickOpenSkill()}>
                  <AddIcon />
                </IconButton>
              }
              title=<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                Skills
              </Typography>
            />
            <CardContent>
              <Grid container spacing={1}>
                {skillsData?
                  skillsData.candidate.skills.map((skill, skill_list_index) => {
                    return(<Grid item><Chip key = {skill_list_index} label={skill.title} onDelete={() => handleRemoveSkill(skill.id)} /></Grid>)
                  })
                  :"No skills selected"}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>);
}
