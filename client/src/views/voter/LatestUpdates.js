import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import CardStats1 from '../../components/CardStats1'
import CardStats2 from '../../components/CardStats2'
import CardStats3 from '../../components/CardStats3'
import ContainerLabel from '../../components/ContainerLabel'
import MuiModal from '../../components/MuiModal'
import MuiTabs from '../../components/MuiTabs'
import postImg from './../../assets/images/post.jpeg';

export default function LatestUpdates() {
  return (
    <BodyLayout>
      <Container>
        <ContainerLabel label="All at one place to get updated" />
        <Box sx={{ py: 3 }} />
        <MuiTabs tabs={[{ label: 'Blogs', comp: <AllBlogs /> }, { label: 'Donations', comp: <AllDonations /> }, { label: 'Announcements', comp: <AllAnnouncements /> }]} />
      </Container>
    </BodyLayout>
  )
}


function AllBlogs(props) {
  let allBlogs = [1, 2, 3];
  const [readBlog, setReadBlog] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        {allBlogs.map(b => <Grid item sx={12} sm={4}>
          <CardStats2
            cardActions={[{ label: 'read_more', fun: setReadBlog }]}
            heading={'haeding lol'}
            subject={'skjdnfj sodjfohs iosdhfoh '}
          />
        </Grid>)}
      </Grid>
      <MuiModal open={readBlog} setOpen={setReadBlog} title={'Blog Title'} >
        <Box sx={{ maxHeight: "200px", maxWidth: "320px", p: 1 }} className="flex justifyCenter alignCenter" >
          <img alt='blog img' src={postImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
      </MuiModal>
    </>
  )
}

function AllAnnouncements(props) {
  let allAnnouncements = [1, 2, 3];

  return (
    <Grid container spacing={2}>
      {allAnnouncements.map(announcement => <Grid item xs={12} sm={6}>
        <CardStats1 heading1={'Registeration'} heading2={'Kick start of voting session'} date={'20th Jan'} />
      </Grid>)}
    </Grid>
  )

}

function AllDonations(props) {
  let allDonations = [1, 2, 3];

  return (
    <Grid container spacing={2}>
      {allDonations.map(d => <Grid item xs={12} sm={3}>
        <CardStats3 name={'Party A '} cause={'This money will be used to feed poor children'} imgUrl={true} >
          <Box>
            <Button fullWidth variant='contained'>Donate</Button>
          </Box>
        </CardStats3>
      </Grid>)}
    </Grid>
  )
}