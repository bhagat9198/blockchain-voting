import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React from 'react'
import AdvanceTable from '../../components/AdvanceTable'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'
import BodyLayout from '../common/BodyLayout'



export default function Result() {
  return (
    <>
      <BodyLayout>
        <Grid container spacing={3} style={{ height: '100%'}} >
          <Grid item sx={12} sm={3} style={{ minWidth: '250px', borderRight: '1px solid #DDD',  }} >
            <Container >
              <ContainerLabel label="Top Parties" />
              <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber1'} style={{ m: 2 }} />
              <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber2'} style={{ m: 2 }} />
              <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber3'} style={{ m: 2 }} />
            </Container>
          </Grid>
          <Grid item sx={12} sm={9} >
            <Container>
              <ContainerLabel label="All Top Parties" />
              <AdvanceTable ></AdvanceTable>
            </Container>
          </Grid>
        </Grid>
      </BodyLayout>
    </>
  )
}
