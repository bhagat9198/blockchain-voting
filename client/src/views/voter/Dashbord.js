import { Box, Button, Container, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import BodyLayout from '../../components/BodyLayout'
import LatestAnnouncements from '../common/LatestAnnouncements'
import VoteState from '../common/VoteState'
import LatestBlogs from '../common/LatestBlogs'
import LatestDonations from '../common/LatestDonations'

export default function Dashbord(props) {
  const { userType } = props;

  // useEffect(() => {
  //   async function asyncFun() {
  //     const responses = await Promise.all([
  //       dispatch(latestAnnouncementsFun()),
  //       dispatch(latestBlogsFun()),
  //       dispatch(latestDonationsFun()),
  //       dispatch(adminSettingsFun())
  //     ])
  //     console.log('Dashbord :: responses :: ', responses);
  //     responses.map(res => {
  //       if (!res.status) {
  //         toast.error(res.message);
  //       }
  //     })
  //   }
  //   asyncFun()
  // }, [])

  return (
    <BodyLayout userType={userType} >
      <LatestAnnouncements />
      <Divider />
      <VoteState userType={userType} />
      <Divider />
      <LatestBlogs />
      <Divider />
      <LatestDonations />
      <Divider />
      <Container sx={{ py: 3 }} />
    </BodyLayout>
  )
}
