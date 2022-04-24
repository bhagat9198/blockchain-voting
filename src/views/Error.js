import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import img404 from './../assets/images/404.jpg';
import img500 from './../assets/images/500.jpg';
import { BiArrowBack } from 'react-icons/bi'
import BodyLayout from './common/BodyLayout';

export default function Error(props) {
  const { errorCode } = props;
  let imgUrl;

  if (errorCode === '404') {
    imgUrl = img404;
  }

  if (errorCode === '500') {
    imgUrl = img500;

  }

  return (
    <BodyLayout hideNav={true}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
        <Box sx={{ width: '50%', minWidth: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ mb: 3 }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={imgUrl} alt="error_img" />
          </Box>
          <Box>
            <Button variant='contained' startIcon={<BiArrowBack />} >Go back</Button>
          </Box>
        </Box>
      </Container>
    </BodyLayout>
  )
}
