import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import img404 from './../assets/images/404.jpg';
import img500 from './../assets/images/500.jpg';
import img401 from './../assets/images/401.png';
import { BiArrowBack } from 'react-icons/bi'
import BodyLayout from '../components/BodyLayout';

export default function Error(props) {
  const { errorCode, goBackBtn, message } = props;
  let imgUrl;

  if (errorCode === '404') {
    imgUrl = img404;
  } else if (errorCode === '500') {
    imgUrl = img500;
  } else if (errorCode === '401') {
    imgUrl = img401;
  } else {
    // invalid error
  }

  return (
    <BodyLayout hideDrawer={true}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: "column" }} >
        <Box sx={{ width: '40%', minWidth: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ mb: 3 }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={imgUrl} alt="error_img" />
          </Box>
        </Box>
        {message &&
          <Typography variant='subtitle1' fontWeight={600} >
            {message}
          </Typography>
        }
        {goBackBtn && <Box>
          <Button variant='contained' startIcon={<BiArrowBack />} >Go back</Button>
        </Box>}
      </Container>
    </BodyLayout>
  )
}
