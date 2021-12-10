import * as React from 'react';
import { DataGrid, gridRowsLookupSelector } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { gql, useQuery } from '@apollo/client';
import ApplicationCard from "../Card/ApplicationCard";

// Define GraphQL query for page data
const GET_APPLICATIONS = gql`
query GetApplications($candidateId: Int!){
  applications (where:{candidateId:$candidateId}){
    id
    date
    status
    openingId
    opening{
      title
      companyId
      company{
        title
      }
    }
  }
}`;

export default function Applications() {

  // Execute the GraphQL query
  const { loading:applicationsLoading, error:applicationsError, data:applicationsData } = useQuery(GET_APPLICATIONS, {
    variables: { candidateId : 2 },
  });
  if (applicationsLoading) return 'Loading applications...';
  if (applicationsError) return `Error! ${applicationsError.message}`;

  // Return data and HTML
  return (<Container sx={{ px: { xs: 1, md: 2 }, py:1 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ mx: 'auto'}}>
                <Typography
                  sx={{ display: "flex", mb:1, px:1 }}
                  component="h1"
                  variant="h6"
                  fontWeight="bold"
                  >
                  Applications
                </Typography>
                <Divider sx={{mb:2}}/>
                {applicationsData.applications.map((application, idx) => {return (<div>
                  <ApplicationCard
                    key = {idx}
                    title = {application.opening.title}
                    company = {application.opening.company.title}
                    />
                </div>)})
                }
              </Grid>
            </Grid>
          </Container>
  );
}
