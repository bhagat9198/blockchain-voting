import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import { FileUploadWithPreview } from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';

export default function AddParty() {
  return (
    <BodyLayout>
      <Container>
        <ContainerLabel label="Add Your Electrol Party" />
        <Box sx={{ py: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <div class="custom-file-container" data-upload-id="myFirstImage"></div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
        </Grid>
      </Container>
    </BodyLayout>
  )
}
