import { Box, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats2 from '../../components/CardStats2';
import MuiModal from '../../components/MuiModal';
import postImg from './../../assets/images/post.jpeg';
import BodyLayout from '../../components/BodyLayout';
import { allBlogs as allBlogsFun } from './../../store/actions/common'
import { toast } from 'react-toastify';
import AddBlog from '../common/AddBlog';
import AllBlogs from '../common/AllBlogs';

export default function Blog(props) {
  const { userType } = props;

  const [addBlog, setAddBlog] = useState(false);
  const [readBlog, setReadBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);

  useEffect(() => {
    // async function asyncFun() {
    //   // const res = await dispatch(allBlogsFun());
    //   if (!res.status) {
    //     toast.error(res.message);
    //     return;
    //   }
    // }
    // asyncFun()
  }, [])

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
