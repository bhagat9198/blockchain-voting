import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BodyLayout from '../../components/BodyLayout'
import CardStats1 from '../../components/CardStats1'
import CardStats2 from '../../components/CardStats2'
import CardStats3 from '../../components/CardStats3'
import ContainerLabel from '../../components/ContainerLabel'
import MuiModal from '../../components/MuiModal'
import MuiTabs from '../../components/MuiTabs'
import postImg from './../../assets/images/post.jpeg';
import {
  allAnnouncements as allAnnouncementsFun,
  allBlogs as allBlogsFun,
  allDonations as allDonationsFun,
} from './../../store/actions/common';
import { format } from 'date-fns';
import { BASE_URL } from '../../util'
import { toast } from 'react-toastify';

export default function LatestUpdates(props) {
  const { userType } = props;
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const allAnnouncements = miscellaneousRed.announcements;
  const allBlogs = miscellaneousRed.blogs;
  const allDonations = miscellaneousRed.donations;
  const dispatch = useDispatch();

  console.log('Dashbord :: allAnnouncements :: ', allAnnouncements);
  console.log('Dashbord :: allBlogs :: ', allBlogs);
  console.log('Dashbord :: allDonations :: ', allDonations);

  useEffect(() => {
    async function asyncFun() {
      const responses = await Promise.all([
        dispatch(allAnnouncementsFun()),
        dispatch(allBlogsFun()),
        dispatch(allDonationsFun()),
      ])
      // console.log('LatestUpdates :: responses :: ', responses);
      responses.map(res => {
        if (!res.status) {
          toast.error(res.message);
        }
      })
    }
    asyncFun()
  }, [])

  return (
    <BodyLayout userType={userType}>
      <Container>
        <ContainerLabel label="All at one place to get updated" />
        <Box sx={{ py: 3 }} />
        <MuiTabs
          tabs={[
            { label: 'Blogs', comp: <AllBlogs allBlogs={allBlogs} /> },
            { label: 'Donations', comp: <AllDonations allDonations={allDonations} /> },
            { label: 'Announcements', comp: <AllAnnouncements allAnnouncements={allAnnouncements} /> }]} />
      </Container>
    </BodyLayout>
  )
}


function AllBlogs(props) {
  const { allBlogs } = props;
  const [readBlog, setReadBlog] = useState({ status: false, data: {} });
  console.log('LatestUpdates :: AllBlogs :: readBlog :: ', readBlog);
  return (
    <>
      <Grid container spacing={2}>
        {allBlogs.map(b => <Grid item sx={12} sm={4}>
          <CardStats2
            cardActions={[{ label: 'read_more', fun: setReadBlog }]}
            heading={b.heading}
            subject={b.p1}
            img={`${BASE_URL}/${b.imgPath}/${b.imgName}`}
            allData={b}
          />
        </Grid>)}
      </Grid>
      <MuiModal open={readBlog.status} setOpen={(val) => setReadBlog({ status: false, data: {} })} title={readBlog.data?.heading} >
        <Box sx={{ maxHeight: "200px", maxWidth: "320px", p: 1 }} className="flex justifyCenter alignCenter" >
          <img alt='blog img' src={`${BASE_URL}/${readBlog.data?.imgPath}/${readBlog.data?.imgName}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Typography variant='body1' sx={{ py: 1 }} >
          {readBlog.data?.p1}
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          {readBlog.data?.p2}
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          {readBlog.data?.p3}
        </Typography>
      </MuiModal>
    </>
  )
}

function AllAnnouncements(props) {
  const { allAnnouncements } = props;

  return (
    <Grid container spacing={2}>
      {allAnnouncements.map(announcement => {
        const d = new Date(Number(announcement.createdAt));
        const date = format(d, 'dd-MMM');
        return (
          <Grid item xs={12} sm={6}>
            <CardStats1
              heading1={announcement.heading}
              heading2={announcement.body} date={date} />
          </Grid>)
      })}
    </Grid>
  )
}

function AllDonations(props) {
  const { allDonations } = props;

  return (
    <Grid container spacing={2}>
      {allDonations.map(d => <Grid item xs={12} sm={4}>
        <CardStats3 name={d.heading} cause={d.cause} imgUrl={true} >
          <Box>
            <Button fullWidth variant='contained'>Donate</Button>
          </Box>
        </CardStats3>
      </Grid>)}
    </Grid>
  )
}