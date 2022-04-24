import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React from 'react'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'





export default function Result() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sx={12} sm={3} >
          <Container>
            <ContainerLabel label="Top Parties" />
            <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber1'} style={{ m: 2 }} />
            <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber2'} style={{ m: 2 }} />
            <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber3'} style={{ m: 2 }} />
          </Container>
        </Grid>
        <Grid item sx={12} sm={9} >

        </Grid>
      </Grid>
    </>
  )
}
