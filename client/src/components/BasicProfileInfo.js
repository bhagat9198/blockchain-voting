import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import ContainerLabel from './ContainerLabel'
import userImg from './../assets/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './../store/actions/auth';
import { toast } from 'react-toastify';
import { BASE_URL, imgObjectUrl } from '../util';

export default function BasicProfileInfo() {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newCPwd, setNewCPwd] = useState('');
  const [imgPreview, setImgPreview] = useState(false);
  const userRed = useSelector(state => state.userRed);
  const userData = userRed.userData;

  const dispatch = useDispatch();
  const inputFileRef = useRef(null);

  const pwdResetHandler = async (e) => {
    if (oldPwd !== newCPwd) {
      toast.error('Mismatch in new password. Try again')
      return;
    }

    const res = await dispatch(
      resetPassword({
        oldPwd,
        newPwd,
        email: userRed?.userData?.email,
      }))
    if (!res.status) {
      toast.error(res.message)
      return;
    }
    toast.success('Password updated')
  }

  const fileImgChangeHandler = e => {
    if (!e.target.files || e.target.files.length === 0) return;

    const res = imgObjectUrl({ fileImg: e.target.files[0] });
    if (res.status) {
      setImgPreview(res.imgObj)
    } else {
      toast.error('Error. Try again')
      setImgPreview(false);
    }
  }

  const uploadImgHandler = e => {
    inputFileRef.current.click();
  }

  let uImg;
  if(imgPreview) {
    uImg = imgPreview;
  } else if(userData?.imgPath && userData?.imgName) {
    uImg = `${BASE_URL}/${userData?.imgPath}/${userData?.imgName}`
  } else {
    uImg = userImg
  }

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={4} className="flex justifyCenter " >
          <Box sx={{ width: '60%', height: '400px', mt: 5 }}>
            <img alt="user img" src={uImg} className="img" />
            <Button onClick={uploadImgHandler} variant="contained" fullWidth>Update Image</Button>
            <input type='file' hidden ref={inputFileRef} onChange={fileImgChangeHandler} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Container>
            <ContainerLabel label="Basic Info" />
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Name</Typography>
              <Typography variant='h6'>{userRed?.userData?.name}</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Email</Typography>
              <Typography variant='h6'>{userRed?.userData?.email}</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Voting Id Number</Typography>
              <Typography variant='h6'>{userRed?.userData?.voteCardId}</Typography>
            </Box>
          </Container>

          <Container>
            <ContainerLabel label="Basic Info" />
            <Card>
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField type='password' fullWidth label="Current Password" variant="filled" key='user-opwd'
                    onChange={e => setOldPwd(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField type='password' fullWidth label="New Password" variant="filled" key='user-pwd'
                    onChange={e => setNewPwd(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField type='password' fullWidth label="Confirm New Password" variant="filled" key='user-cpwd'
                    onChange={e => setNewCPwd(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth
                    onClick={pwdResetHandler}
                  >Update Password</Button>
                </Box>
              </form>
            </Card>
          </Container>
        </Grid >
      </Grid >
    </>
  )
}
