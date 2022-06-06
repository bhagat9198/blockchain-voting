import { Box, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats2 from '../../components/CardStats2';
import MuiModal from '../../components/MuiModal';
import postImg from './../../assets/images/post.jpeg';
import BodyLayout from '../../components/BodyLayout';
import { addBlog as addBlogFun } from './../../store/actions/privliged';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { allBlogs as allBlogsFun } from './../../store/actions/common'
import { BASE_URL } from '../../util';
import AddBlog from '../common/AddBlog';
import AllBlogs from '../common/AllBlogs';
export default function Blog(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <Container sx={{ my: 5 }} >
        <AddBlog />
        <Box>
          <ContainerLabel label="All Blogs" />
          <Grid container spacing={2}>
            <AllBlogs />
          </Grid>
        </Box>
      </Container>
    </BodyLayout>
  )
}
