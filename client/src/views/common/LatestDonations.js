import { Box, Button, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CardStats3 from '../../components/CardStats3';
import ContainerLabel from '../../components/ContainerLabel';
import { latestDonations as latestDonationsFun } from './../../store/actions/common';


export default function LatestDonations() {
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const latestDonations = miscellaneousRed.latestDonations;
  const dispatch = useDispatch();
  

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(latestDonationsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  return (
    <Container sx={{ py: 3 }}>
      <ContainerLabel label="Donate" />
      <Grid container spacing={2}>
        {latestDonations.map((donation, i) => {
          return (
            <Grid item sx={12} sm={3} key={`donate_${i}`}>
              <CardStats3 
                name={donation.heading} cause={donation.cause} 
                imgUrl={true} >
                <Box>
                  <Button fullWidth variant='contained'>Donate Us</Button>
                </Box>
              </CardStats3>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  )
}
