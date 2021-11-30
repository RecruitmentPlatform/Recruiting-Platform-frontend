import * as React from 'react';
import { DataGrid, gridRowsLookupSelector } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { gql, useQuery } from '@apollo/client';

const GET_APPLICATIONS = gql`
query  Applications{
  applications{
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

// const rows = [
//   { id: 1, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 2, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 3, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 4, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 5, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 6, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 7, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
//   { id: 8, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
// ];

export default function Applications() {

  const { loading, error, data } = useQuery(GET_APPLICATIONS);
  // const responseData = data["applications"]
  const rows = []

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // console.log(data)
  for(let i=0; i<data["applications"].length; i++){
    let newRow = {}
    console.log(data["applications"])
    newRow["id"] = i;
    newRow["applicationDate"] = data["applications"][i]["date"];
    newRow["applicationStatus"] = data["applications"][i]["status"];
    newRow["companyTitle"] = data["applications"][i]["opening"]["company"]["title"];
    newRow["openingTitle"] = data["applications"][i]["opening"]["title"];
    newRow["applicationStatus"] = data["applications"][i]["opening"]["title"];
    rows.push(newRow)
  }

  // console.log(res)


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
        rowsPerPageOptions={[5,10]}
        checkboxSelection
      />
    </div>
    </Container>
  );
}
