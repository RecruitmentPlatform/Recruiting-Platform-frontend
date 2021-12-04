import * as React from 'react';
import { DataGrid, gridRowsLookupSelector } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { gql, useQuery } from '@apollo/client';

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
    }}}}`;

// Define columns list
const columns = [
  { field: 'companyTitle', headerName: 'Company', width: 130 },
  { field: 'openingTitle', headerName: 'Opening', width: 200 },
  {
    field: 'applicationDate',
    headerName: 'Date',
    type: 'number',
    width: 90
  },
  {
    field: 'applicationStatus',
    headerName: 'Status',
    width: 90
  },
];

export default function Applications() {

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_APPLICATIONS, {
    variables: { candidateId : 2 },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Create empty list of row data
  const rows = [];

  // Populate row data
  for(let i=0; i<data["applications"].length; i++){
    let newRow = {}
    console.log(data["applications"])
    newRow["id"] = i;
    newRow["applicationDate"] = data["applications"][i]["date"];
    newRow["applicationStatus"] = data["applications"][i]["status"];
    newRow["companyTitle"] = data["applications"][i]["opening"]["company"]["title"];
    newRow["openingTitle"] = data["applications"][i]["opening"]["title"];
    newRow["applicationStatus"] = data["applications"][i]["opening"]["title"];
    rows.push(newRow);
  }

  // Return data and HTML
  return (
    <Container sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        component="h1"
        variant="h6"
        color="text.primary"
        gutterBottom
      >
        Your Applications
      </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </Container>
  );
}
