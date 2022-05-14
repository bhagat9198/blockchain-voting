import { Box, Button, Container, Grid, InputAdornment, Paper, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import { imgObjectUrl } from '../../util';
import userImg from './../../assets/images/user.png';
import { toast } from 'react-toastify';
import { AiOutlineUpload, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { CgRename } from 'react-icons/cg';
import { MdEmojiSymbols, MdOutlinePlace } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';

export default function AboutParty(props) {
  const inputFileRef = useRef(null);
  const [imgPreview, setImgPreview] = useState(false);
  const [name, setName] = useState('');
  const [symbolName, setSymbolName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [moto, setMoto] = useState('');
  const [vision, setVision] = useState('');

  const uploadImgHandler = e => {
    inputFileRef.current.click();
  }

  const fileImgChangeHandler = e => {
    if (!e.target.files || e.target.files.length === 0) return;

    const res = imgObjectUrl({ fileImg: e.target.files[0] });
    console.log('res :: ', res);
    if (res.status) {
      setImgPreview(res.imgObj)
    } else {
      toast.error('Error. Try again')
      setImgPreview(false);
    }
  }

  return (
    <BodyLayout>
      <Container>
        <ContainerLabel label="Add Your Electrol Party" />
        <Box sx={{ py: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Box sx={{ width: '100%', height: '400px' }} >
                <img src={imgPreview ? imgPreview : userImg} alt="user img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
              <Box>
                <Button onClick={uploadImgHandler} variant='outlined' startIcon={<AiOutlineUpload />} >Upload Symbol</Button>
                <input type='file' hidden ref={inputFileRef} onChange={fileImgChangeHandler} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper sx={{ px: 2 }}>
              <Box sx={{ py: 2 }} >
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder="Your Full Name"
                  value={name}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CgRename /></InputAdornment> }}
                  onChange={e => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder="Your Full Name"
                  value={symbolName}
                  InputProps={{ startAdornment: <InputAdornment position="start"><MdEmojiSymbols /></InputAdornment> }}
                  onChange={e => setSymbolName(e.target.value)}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder="Your Full Name"
                  value={candidateName}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BsFillPersonLinesFill /></InputAdornment> }}
                  onChange={e => setCandidateName(e.target.value)}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder="Your Full Name"
                  value={state}
                  InputProps={{ startAdornment: <InputAdornment position="start"><MdOutlinePlace /></InputAdornment> }}
                  onChange={e => setState(e.target.value)}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder="Your Full Name"
                  value={district}
                  InputProps={{ startAdornment: <InputAdornment position="start"><MdOutlinePlace /></InputAdornment> }}
                  onChange={e => setDistrict(e.target.value)}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Paragraph 1"
                  minRows={3}
                  style={{ width: "100%", padding: "20px" }}
                  value={moto}
                  onChange={e => setMoto(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><MdOutlinePlace /></InputAdornment> }}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Paragraph 1"
                  minRows={3}
                  style={{ width: "100%", padding: "20px" }}
                  onChange={e => setVision(e.target.value)}
                  value={vision}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <Button fullWidth variant='contained' startIcon={<AiOutlineUsergroupAdd />} >Update Party Info</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BodyLayout>
  )
}
