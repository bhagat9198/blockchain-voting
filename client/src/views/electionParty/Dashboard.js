import { Box, Button, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import CardStats1 from './../../components/CardStats1';
import CardStats2 from './../../components/CardStats2';
import CardStats3 from './../../components/CardStats3';

export default function Dashboard(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <Container sx={{ pb: 3 }} >
        <ContainerLabel label="Top Annocemnets" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardStats1 iconName={'RiNumber0'} heading1={'Registeration'} heading2={'Kick start of voting session'} date={'20th Jan'} />
            <CardStats1 iconName={'RiNumber1'} heading1={'Verification'} heading2={'User needs to verify before vote'} date={'30th Jan'} />
            <CardStats1 iconName={'RiNumber2'} heading1={'Wait is over'} heading2={'Voting session will being in fews days'} date={'28 Feb'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStats1 iconName={'RiNumber3'} heading1={'Rules '} heading2={'Before you vote , make sure vote properly as only vote can be given'} date={'10th March'} />
            <CardStats1 iconName={'RiNumber4'} heading1={'No crowd celebration'} heading2={'Keeping covid in mind, no celebration should be done'} date={'30th March'} />
            <CardStats1 iconName={'RiNumber5'} heading1={'Results'} heading2={'Voting results will be opening shortl. Stay Tuned. '} date={'1st Aprail'} />
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
            <CardStats2 heading={'Why Voting is important? '} subject={'making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classica'} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'How to Vote on website? '} subject={'making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classica'} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'Vote is right and duty of everyone'} subject={'making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classica'} />
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats2 heading={'Voting on blockchain is good'} subject={'making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classica'} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }}>
        <ContainerLabel label="Donate" />
        <Grid container spacing={2}>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'Party A '} cause={'This money will be used to feed poor children'} imgUrl={true} >
              <Box>
                <Button fullWidth variant='contained'>Donate Us</Button>
              </Box>
            </CardStats3>
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'Party A '} cause={'This money will be used to feed poor children'} imgUrl={true} >
              <Box>
                <Button fullWidth variant='contained'>Donate Us</Button>
              </Box>
            </CardStats3>
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'Party A '} cause={'This money will be used to feed poor children'} imgUrl={true} >
              <Box>
                <Button fullWidth variant='contained'>Donate Us</Button>
              </Box>
            </CardStats3>
          </Grid>
          <Grid item sx={12} sm={3}>
            <CardStats3 name={'Party A '} cause={'This money will be used to feed poor children'} imgUrl={true} >
              <Box>
                <Button fullWidth variant='contained'>Donate Us</Button>
              </Box>
            </CardStats3>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 3 }}>

      </Container>
    </BodyLayout>
  )
}
