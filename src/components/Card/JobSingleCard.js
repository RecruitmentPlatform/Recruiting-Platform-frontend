import {React, Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import {Card, CardContent, CardHeader, CardActionArea, CardActions } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

import Button from '@mui/material/Button';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CompanyCard from "../Card/CompanyCard";

const JobSingleCard =({id,title,company,companyId,companyDescription,description,website,employment,location,salaryLow,salaryHigh,candidateId,first,last}) => {
  const CREATE_APPLICATION = gql`
  mutation CreateApplication($date:Int!, $openingId:Int!, $candidateId:Int!,$status:Int!) {
        createApplication(date:$date, openingId: $openingId, candidateId: $candidateId, status: $status){
          id
        }
    }`;
  const [createApplication, { data:applicationData, loading:applicationLoading }] = useMutation(CREATE_APPLICATION);
  // Modal data
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    return (<Card sx={{mb:2}}>
      <CardHeader
        avatar={
          <Avatar alt={company} src={"//logo.clearbit.com/"+website} />
        }
        title=<Typography sx={{fontWeight: 'bold'}} component="h1" variant="h6">
          {title}
        </Typography>
        subheader={company}
        action={<Button variant="contained" onClick={handleClickOpen}>
          Apply Now
        </Button>}
      />
      <CardContent sx={{pt:0}}>
        <Stack direction="row" spacing={1}>
          <Chip size="small" color="primary" sx={{mr:.5}} icon={<WorkIcon />} label={employment}  />
          <Chip size="small" color="primary" icon={<LocationOnIcon />} label={location}  />
          <Chip size="small" color="success" icon={<AttachMoneyIcon />} label={salaryLow + " - " + salaryHigh}  />
          <Chip size="small"
            color="info"
            avatar=<Avatar alt="Natacha" src={"https://mui.com/static/images/avatar/"+candidateId+".jpg"} />
            label={first + " " + last}
            component="a"
            href={"/u/"+1}

            clickable
          />
          <Chip size="small" icon={<AccessTimeFilledIcon />} label="2 hours ago"  />
        </Stack>
      </CardContent>
      <Divider/>
      <CardContent>
        <Typography>
          {description}
        </Typography>
      </CardContent>
      <Divider/>
      <CardContent>
        <Typography
          component="h3"
          variant="h6">About the Company</Typography>
        <CompanyCard
          id = {companyId}
          title = {company}
          description={companyDescription.length > 300 ? companyDescription.substring(0, 300) + "..." : companyDescription}
           />
      </CardContent>
      <Divider/>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="info">Before submitting a job application — <Link href="/u">complete your profile</Link>!</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="button"
          onClick={() => {
            createApplication({
                variables: {
                  date: 666,
                  openingId: id,
                  candidateId: candidateId,
                  status: 1
                }
              })
              .then(history.push("/applications"))
          }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Card>)

}

export default JobSingleCard;
