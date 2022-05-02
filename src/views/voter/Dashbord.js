import { Box, Button, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import CardStats1 from '../../components/CardStats1'
import CardStats2 from '../../components/CardStats2'
import CardStats3 from '../../components/CardStats3'
import ContainerLabel from '../../components/ContainerLabel'

export default function Dashbord(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <Container sx={{ pb: 3 }} >
        <ContainerLabel label="Top Annocemnets" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardStats1 iconName={'RiNumber0'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber1'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber2'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber3'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber4'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStats1 iconName={'RiNumber5'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber6'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber7'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber8'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
            <CardStats1 iconName={'RiNumber9'} heading1={'heading0'} heading2={'heading20'} date={'22nd March'} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }} >
        <ContainerLabel label="Voting Status" />
        <Box className='flex justifyCenter' >
          <Button variant='contained'> Voting pahase is open : Cast Your Vote Now </Button>
        </Box>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }}>
        <ContainerLabel label="Top Blogs" />
        <Grid container spacing={2}>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'heading '} subject={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'heading '} subject={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'heading '} subject={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'heading '} subject={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }}>
        <ContainerLabel label="Donate" />
        <Grid container spacing={2}>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'heading '} cause={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'heading '} cause={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'heading '} cause={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'heading '} cause={'jsdhf jhdasfoid hoiashdfos '} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }}>

      </Container>
    </BodyLayout>
  )
}
