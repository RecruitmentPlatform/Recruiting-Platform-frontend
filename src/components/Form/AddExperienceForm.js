import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {React, Fragment, useState} from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

const ADD_EXPERIENCE = gql`
    mutation CreateExperience($candidateId:Int!, $companyId:Int!,$start:Int!, $end:Int!, $positionId:Int!, $categoryId:Int!, $employmentId:Int!,
                              $location:String!, $description:String!) {
        createExperience(candidateId:$candidateId, companyId:$companyId, start: $start, end: $end, positionId: $positionId, categoryId: $categoryId,
                         employmentId:$employmentId, location:$location, description:$description){
                           id
                         }}`;

const AddExperienceForm = () => {
    const [formData, setFormData] = useState({"title":"", "employmentType":"", "CompanyName":"","Location":"","Start":"","End":"", "Description":""})
    const [open, setOpen] = useState(false);
    const handleClickOpen = (value) => {
        setOpen(true);
      };
      const handleClose = () => {
        
        setOpen(false);
      };

      const handleInput = (e) => {
        const key = e.target.name;
        setFormData({...formData, [key]:e.target.value});
        console.log(e.target.value);
    }

    const [createExperiene, {loading2, error2}] = useMutation(ADD_EXPERIENCE, {variables:{candidateId:1, companyId:1, start:123, end:123, positionId:2, 
        categoryId:1, employmentId:1, location: "San Fransisco", 
        description:"Build recruiting platform"}})
    if (loading2) return 'Loading...';
    if (error2) return `Error! ${error2.message}`;
    
    

    return(<Dialog open={open} onClose={handleClose}>
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
            <Button onClick={createExperiene}>Submit</Button>
            </DialogActions>
      </Dialog>
      )
}

export default AddExperienceForm