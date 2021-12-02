import * as React from 'react';
import { DataGrid, gridRowsLookupSelector } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { gql, useQuery } from '@apollo/client';

const GET_INTERVIEWS = gql`
query GetInterviews {
  interviews {
    id
    start
    end
    applicationId
    application {
      candidateId
      candidate {
        first
        last
      }
      openingId
      opening {
        title
        companyId
        company {
          title
        }
      }
    }
  }
}`;

const columns = [
  { field: 'candidateName', headerName: 'Candidate', width: 200 },
  { field: 'openingTitle', headerName: 'Opening', width: 200 },
  { field: 'companyTitle', headerName: 'Company', width: 200 },
  {
    field: 'applicationDate',
    headerName: 'Application Date',
    type: 'number',
    width: 90
  },
  {
    field: 'interviewDate',
    headerName: 'Interview Date',
    type: 'number',
    width: 90
  }
];

/* const rows = [
   { id: 1, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 }
 ]; */

export default function Interviews() {

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_INTERVIEWS, {
    variables: { candidateId : 1 },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Create empty list of row data
  const rows = [];

  // Populate row data
  for(let i=0; i<data["interviews"].length; i++){
    let newRow = {}
    console.log(data["interviews"])
    newRow["id"] = i;

    newRow["candidateName"] = data["interviews"][i]["application"]["candidate"]["first"];

    newRow["openingTitle"] = data["interviews"][i]["application"]["opening"]["title"];

    newRow["companyTitle"] = data["interviews"][i]["application"]["opening"]["company"]["title"];

    newRow["applicationDate"] = data["interviews"][i]["application"]["date"];

    newRow["interviewDate"] = data["interviews"][i]["start"];

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
        Your Interviews
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
