import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import userImg from './../../assets/images/u1.png';
import BodyLayout from './BodyLayout';

export default function AboutUs() {
  return (
    <BodyLayout>
      <Box sx={{ bgcolor: '#dadada', height: '100%' }} className="flex alignCenter justifyCenter">
        <Container  >
          <Grid container spacing={3}>
            <Grid item sm={6} sx={12}>
              <Box className="flex alignCenter justifyCenter">
                
              <Box sx={{ maxWidth: '300px', maxHeight: "300px", mb: 5 }} >
                <img alt='user' src={userImg} style={{ height: '100%', width: '100%', objectFit: 'contain', borderRadius: '50%' }} />
              </Box>
              </Box>
              <Typography gutterBottom variant='h6'>Name</Typography>
              <Typography sx={{color: 'darkslategray'}}>
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Typography>
            </Grid>
            <Grid item sm={6} sx={12}>
              <Box className="flex alignCenter justifyCenter">
                
              <Box sx={{ maxWidth: '300px', maxHeight: "300px", mb: 5,  }} >
                <img alt='user' src={userImg} style={{ height: '100%', width: '100%', objectFit: 'contain', borderRadius: '50%' }} />
              </Box>
              </Box>
              <Typography gutterBottom variant='h6'>Name</Typography>
              <Typography sx={{ color: 'darkslategray' }}>
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </BodyLayout>
  )
}
