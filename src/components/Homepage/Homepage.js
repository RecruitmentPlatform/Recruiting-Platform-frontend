import {React, useState, useContext, useEffect} from "react";
import { useHistory } from "react-router-dom"; //for routing
import { AuthContext } from "../../AuthContext";
import axios from "axios"

import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import JobCard from "../Card/JobCard";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from '@mui/icons-material/Public';
import Avatar from '@mui/material/Avatar';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

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
      id
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
// Post GQL Commands
const GET_ALL_POSTS = gql`
  query GetAllPosts{
    posts {
      id
      date
      status
      content
      candidate {
        id
        first
        last
      }
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
  }`;

const ADD_POST = gql`
  mutation AddPost($candidateId:Int!,$date:Int!,$status:Int!,$content:String!,$openingId:Int) {
    createPost(candidateId:$candidateId,date:$date,status:$status,content:$content,openingId:$openingId) {
      id
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

export default function Homepage() {
  const uid = +sessionStorage.getItem("uid");

  const [refreshPosts, { loading:postsLoading, data:postsData }] = useLazyQuery(GET_ALL_POSTS, {fetchPolicy: 'network-only'});

  const { loading:profileLoading, error:profileError, data:profileData } = useQuery(GET_CANDIDATE, {variables:{id:parseInt(uid)}});

  const { data:openingsData, loading:openingsLoading } = useQuery(GET_CANDIDATE_OPENINGS, {variables:{id:1}});

  const [createPost] = useMutation(ADD_POST);

  const handleSubmitPost = (e) =>{
    e.preventDefault();
    // Check if ID is set for updating

    createPost({
      variables: {
        candidateId: parseInt(uid),
        date: Math.floor(Date.now() / 1000),
        status: 1,
        content: e.target.content.value,
        openingId: parseInt(e.target.openingId.value),
     }
   });
    //Refresh the posts list
    refreshPosts();
  };

  useEffect(() => { refreshPosts();}, []);

  if(openingsLoading) return 'Loading openings...';
  if(profileLoading) return 'Loading profile...';
  if(postsLoading) return 'Loading posts...';

  return (<Container sx={{my:2}}>
  <Grid container spacing={2}>
    <Grid item md={4} xs={12}>
      <Card>
        <CardHeader
        avatar={
          <Avatar {...stringAvatar(profileData.candidate.first+" "+profileData.candidate.last)} />
        }
        title=<Typography component="h1" sx={{fontSize:'15px'}}><Link href={"/u/"+profileData.candidate.id} underline="hover">{profileData.candidate.first+" "+profileData.candidate.last}</Link>
                {profileData.candidate.pronoun.title?
                <Typography sx={{ml:0.5,fontSize:'13px'}} variant="span" color="text.secondary">
                  ({profileData.candidate.pronoun.title})
                </Typography>:null}
              </Typography>
        subheader={profileData.candidate.headline}
        />
      </Card>
    </Grid>
    <Grid item md={8} xs={12}>
        <Card sx={{ mb:2 }}>
          <form onSubmit={handleSubmitPost}>
          <CardHeader
            sx={{pb:0}}
            avatar={
              <Avatar {...stringAvatar("Alex Castro")} />
            }
            title={<Typography sx={{fontWeight:'bold', fontSize:'15px'}} component="h2">
                    Create post
                  </Typography>}
            />
            <CardContent sx={{pt:1,pb:0}}>
              <TextField
                required
                label="What's on your mind?"
                multiline
                rows={3}
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
        {postsData.posts.map((post, postid) => {return (<div>
          <PostCard
            key = {postid}
            id = {post.id}
            user_id = {post.candidate.id}
            name = {post.candidate.first + " " + post.candidate.last}
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
      </Grid>
    </Grid>
  </Container>)
  }
