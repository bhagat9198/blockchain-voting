import { Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import projectScope from './../../assets/images/projectScope.jpeg'

const moto = [
  "An authority must conduct the elections, who should be free of political interference",
  "A set of laws is required to govern the elections. The authority in charge of conducting the elections will hold these laws",
  "A redressal mechanism for the resolution of doubts and disputes that arise out of the elections "
]

export default function Docs() {
  
  return (
    <BodyLayout>
      <Container sx={{py: 3}}>
        <GridRightImg />
        <Divider />
        <GridLeftImg />
        <Divider />
        <GridRightImg />
        <Divider />
        <GridLeftImg />
        <Divider />
      </Container>
    </BodyLayout>
  )
}


const GridRightImg = () => {
  return <Grid container spacing={3} sx={{ py: 2, my: 2 }} >
    <Grid item xs={12} sm={8}>
      <Container>
        <Typography gutterBottom variant='h4'>About Out Project</Typography>
        <Typography>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Typography>
      </Container>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Container>
        <img src={projectScope} alt="projectScope" style={{ objectFit: 'contain', height: '100%', width: '100%' }} />
      </Container>
    </Grid>
  </Grid>
}

const GridLeftImg = () => {
  return <Grid container spacing={3} sx={{ py: 2, my: 2 }} >
    <Grid item xs={12} sm={4}>
      <Container>
        <img src={projectScope} alt="projectScope" style={{ objectFit: 'contain', height: '100%', width: '100%' }} />
      </Container>
    </Grid>
    <Grid item xs={12} sm={8}>
      <Container>
        <Typography gutterBottom variant='h4'>About Our Project</Typography>
        <Typography>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Typography>
      </Container>
    </Grid>
    
  </Grid>
}