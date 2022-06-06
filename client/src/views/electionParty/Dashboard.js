import { Box, Button, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import LatestAnnouncements from '../common/LatestAnnouncements';
import LatestBlogs from '../common/LatestBlogs';
import LatestDonations from '../common/LatestDonations';
import VoteState from '../common/VoteState';
import CardStats1 from './../../components/CardStats1';
import CardStats2 from './../../components/CardStats2';
import CardStats3 from './../../components/CardStats3';

export default function Dashboard(props) {
  const { userType } = props;

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
