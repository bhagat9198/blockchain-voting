import React, { useEffect, useState } from 'react'
import { Grid, Box, Container, Typography, Divider, Card, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'
import userImg from './../../assets/images/u2.jpg';
import { AiOutlineDelete } from 'react-icons/ai';
import BasicProfileInfo from './../../components/BasicProfileInfo';
import BodyLayout from '../../components/BodyLayout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, getAllAdmins } from '../../store/actions/privliged';
import MuiTableSimple from '../../components/MuiTableSimple';
import { getDate } from '../../util';
import ContainerLabel from '../../components/ContainerLabel';
import { format } from 'date-fns';

export default function Profile(props) {
  const { userType } = props;
  console.log('Profile :: props :: ', props);
  const dispatch = useDispatch();

  const [addAdminName, setAddAdminName] = useState('');
  const [addAdminEmail, setAddAdminEmail] = useState('');
  const [addAdminPassword, setAddAdminPassword] = useState('');
  const [addAdminCPassword, setAddAdminCPassword] = useState('');
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  console.log('Profile :: miscellaneousRed :: ', miscellaneousRed);
  let allAdmins = miscellaneousRed.admins;

  const updatedAllAdmins = allAdmins.map(admin => {
    console.log('Profile :: updatedAllAdmins :: admin :: ', admin);
    // let createdOnDate = getDate(admin.createdAt);
    const d = new Date(Number(admin.createdAt));
    const date = format(d, 'dd-MMM-yyyy');

    return { 
      data1: admin.name, data2: admin.email, 
      data3: admin.createdBy, data4: date, 
      action: { delete: true } }
  })

  console.log('updatedAllAdmins :: ', updatedAllAdmins);

  async function fetchAllAdmins() {
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

  useEffect(() => {
    fetchAllAdmins();
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

    fetchAllAdmins();
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
              <ContainerLabel label="Add New Admin" />
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField
                    fullWidth label="Name" variant="outlined" key='admin-name'
                    onChange={e => setAddAdminName(e.target.value)} />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField type='email' fullWidth label="Email" variant="outlined" key='admin-email'
                    onChange={e => setAddAdminEmail(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField type='password' fullWidth label="Password" variant="outlined" key='admin-pwd'
                    onChange={e => setAddAdminPassword(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField type='password' fullWidth label="Confirm Password" variant="outlined" key='admin-cpwd'
                    onChange={e => setAddAdminCPassword(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth
                    onClick={addAdminHandler}
                  >Add New Admin</Button>
                </Box>
              </form>
            </Container>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Container>
              <ContainerLabel label="All Admin's" />
              <MuiTableSimple
                columns={['Name', 'Email', 'Created On', 'Created By', 'Action']}
                rowsData={updatedAllAdmins}
              />
            </Container>
          </Grid>
        </Grid>
      </Box>
    </BodyLayout >
  )
}


