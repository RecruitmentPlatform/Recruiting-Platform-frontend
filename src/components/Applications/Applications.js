import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

const rows = [
  { id: 1, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 2, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 3, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 4, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 5, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 6, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 7, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
  { id: 8, companyTitle: 'Google', openingTitle: 'Software Engineering', applicationDate: '4/14/1995', applicationStatus: 1 },
];

export default function Applications() {
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
