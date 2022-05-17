import React, { useEffect, useState } from 'react'
import { Grid, Box, Container, Typography, Divider, Card, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'
import userImg from './../../assets/images/u2.jpg';
import { AiOutlineDelete } from 'react-icons/ai';
import BasicProfileInfo from './../../components/BasicProfileInfo';
import BodyLayout from '../../components/BodyLayout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, getAllAdmins } from '../../store/actions/privliged';

export default function Profile(props) {
  const { userType } = props;
  const dispatch = useDispatch();

  const [addAdminName, setAddAdminName] = useState('');
  const [addAdminEmail, setAddAdminEmail] = useState('');
  const [addAdminPassword, setAddAdminPassword] = useState('');
  const [addAdminCPassword, setAddAdminCPassword] = useState('');
  const allAdmins = useSelector(state => state.miscellaneousRed.admins);

  useEffect(() => {
    async function asyncFun() {
      try {
        const res = await dispatch(getAllAdmins());
        if (!res.status) {
          toast.error(res.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(`Error:: ${error.message}`)
      }
    }

    asyncFun();
  }, [])

  const addAdminHandler = async () => {
    if (addAdminCPassword !== addAdminPassword) {
      toast.error('Passwords didnt match');
      return;
    }

    try {
      const res = await dispatch(addAdmin({ name: addAdminName, email: addAdminEmail, password: addAdminPassword }));
      if (res.status) {
        toast.success(`New admin added successfully`);
      } else {
        toast.error(`Error:: ${res.message}`)
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error:: ${error.message}`)
    }

  }

  return (
    <BodyLayout userType={userType} >
      <Box sx={{ pb: 2, mb: 2 }}>
        <BasicProfileInfo />
      </Box>
      <Divider />
      <Box sx={{ pb: 2, mb: 2 }}>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={4}>
            <Container>
              <StatsHeading label="Add New Admin" />
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField
                    fullWidth label="Name" variant="outlined"
                    onChange={e => setAddAdminName(e.target.name)} />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Email" variant="outlined"
                    onChange={e => setAddAdminEmail(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Password" variant="outlined"
                    onChange={e => setAddAdminPassword(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Password" variant="outlined"
                    onChange={e => setAddAdminCPassword(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth
                    onClick={addAdminHandler}
                  >Update Password</Button>
                </Box>
              </form>
            </Container>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Container>
              <StatsHeading label="All Admin's" />
              <AdminTable allAdmins={allAdmins} />
            </Container>
          </Grid>
        </Grid>
      </Box>
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

