import React from 'react'
import { Grid, Box, Container, Typography, Divider, Card, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'
import userImg from './../../assets/images/u2.jpg';
import BodyLayout from '../common/BodyLayout';
import { AiOutlineDelete } from 'react-icons/ai';


export default function Profile() {
  return (
    <BodyLayout>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={4} className="flex justifyCenter " >
          <Box sx={{ width: '60%', height: '400px', mt: 5 }}>
            <img alt="user img" src={userImg} className="img" />
            <Button variant="contained" fullWidth>Update Image</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Container>
            <StatsHeading label="Basic Info" />
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Name</Typography>
              <Typography variant='h6'>Dark Alex</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Email</Typography>
              <Typography variant='h6'>abc@xyz.com</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Aadhar Number</Typography>
              <Typography variant='h6'>1324 7896 8521 6547</Typography>
            </Box>
          </Container>

          <Container>
            <StatsHeading label="Basic Info" />
            <Card>
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Current Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="New Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Confirm New Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth>Update Password</Button>
                </Box>
              </form>
            </Card>
          </Container>
        </Grid >
      </Grid >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={4}>
          <Container>
            <StatsHeading label="Add New Admin" />
            <form>
              <Box sx={{ m: 1 }}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Box>
              <Box sx={{ m: 1 }}>
                <TextField fullWidth label="Password" variant="outlined" />
              </Box>
              <Box sx={{ m: 1 }}>
                <TextField fullWidth label="Password" variant="outlined" />
              </Box>
              <Box sx={{ m: 1 }}>
                <Button variant="contained" fullWidth>Update Password</Button>
              </Box>
            </form>
          </Container>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Container>
            <StatsHeading label="All Admin's" />
            <AdminTable />

          </Container>
        </Grid>
      </Grid>
      <Box sx={{ m: 5 }} />
    </BodyLayout >
  )
}


const StatsHeading = (props) => {
  const { label } = props;

  return (
    <Box sx={{ borderRadius: '10px', border: '1px solid gray', p: 1, my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontWeight='bold' >{label}</Typography>
    </Box>
  )
}

function createData(name, email, createdOn, createdBy) {
  return { name, email, createdOn, createdBy };
}

const rows = [
  createData('Dark Alex', 'abc@wer.com', 'Admin 1', '20 Feb'),
  createData('Dark Alex', 'abc@wer.com', 'Admin 1', '20 Feb'),
];

const AdminTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Created on</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">{row.createdOn}</TableCell>
              <TableCell align="right"><Button><AiOutlineDelete /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
