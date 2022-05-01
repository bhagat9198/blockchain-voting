import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import BasicProfileInfo from '../../components/BasicProfileInfo'
import ContainerLabel from '../../components/ContainerLabel'
import BodyLayout from '../common/BodyLayout'

export default function Profile() {
  return (
    <BodyLayout>
      <Box>
        <BasicProfileInfo />
      </Box>
      <Container>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            {/* <ContainerLabel label="Login History" /> */}
            
          </Grid>
        </Grid>
      </Container>
    </BodyLayout>
  )
}
