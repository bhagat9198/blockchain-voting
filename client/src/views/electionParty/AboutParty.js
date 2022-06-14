import { Box, Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import { BASE_URL, imgObjectUrl } from '../../util';
import userImg from './../../assets/images/user.png';
import { toast } from 'react-toastify';
import { AiOutlineUpload, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { CgRename } from 'react-icons/cg';
import { MdEmojiSymbols, MdOutlinePlace } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux'
import { updateElectionParty } from '../../store/actions/privliged';
import { getParty as getPartyFun } from '../../store/actions/common';
import VotingContractRaw from './../../contracts/Voting.json';
import getWeb3 from './../../getWeb3';

export default function AboutParty(props) {
  const { userType } = props;

  const inputFileRef = useRef(null);
  const [partyAlreadyAdded, setPartyAlreadyAdded] = useState(false);
  const [imgPreview, setImgPreview] = useState(false);
  const [name, setName] = useState('');
  const [symbolName, setSymbolName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [moto, setMoto] = useState('');
  const [vision, setVision] = useState('');
  const [symbolImg, setSymbolImg] = useState(null);
  const userRed = useSelector(state => state.userRed);
  const configRed = useSelector(state => state.configRed);
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  console.log('AboutParty :: miscellaneousRed :: ', miscellaneousRed);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AboutParty :: miscellaneousRed :: ', miscellaneousRed);


    async function asyncFun() {

      const res = await dispatch({ partyId: userRed.partyId, addToRedux : true});
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    if (miscellaneousRed?.party) {
      setPartyAlreadyAdded(true)
    } else {
      if (userRed.partyId) {
        asyncFun()
      }
    }

  }, [miscellaneousRed?.party, userRed])

  const uploadImgHandler = e => {
    inputFileRef.current.click();
  }

  let imgData;
  const fileImgChangeHandler = e => {
    if (!e.target.files || e.target.files.length === 0) return;

    setSymbolImg(e.target.files[0])
    const res = imgObjectUrl({ fileImg: e.target.files[0] });
    if (res.status) {
      setImgPreview(res.imgObj)
      imgData = e.target.files[0]
    } else {
      toast.error('Error. Try again')
      setImgPreview(false);
    }
  }

  const updatePartyInfoHandler = async (e) => {
    if (!imgPreview || !name || !symbolName || !candidateName || !state || !district || !moto || !vision) {
      toast.error('Please fill up all the fields and dont forget to upload the party symbol image');
      return;
    }
    const res = await dispatch(updateElectionParty({
      photo: symbolImg, name,
      candidateName, symbolName, moto, vision, state, district,
    }));
    if (!res.status) {
      toast.error(res.message);
      return;
    }
    toast.success('Party Info Updated');
    const web3 = await getWeb3();

    const account = userRed.w3Account;
    console.log('updatePartyInfoHandler :: account :: ', account);
    const networkId = await web3.eth.net.getId();
    console.log('updatePartyInfoHandler :: networkId :: ', networkId);
    const deployedNetwork = VotingContractRaw.networks[networkId];

    const contract = await new web3.eth.Contract(
      VotingContractRaw.abi,
      deployedNetwork && deployedNetwork.address,
    );
    console.log('updatePartyInfoHandler :: contract :: ', contract);

    const req = await contract.methods.addParty(`${res.data.id}`).send({ from: account });
    console.log('updatePartyInfoHandler :: req :: ', req);

    return;
  }


  const stateHandler = (e) => {
    setState(e.target.value)
  }

  let imgurl;
  if (imgPreview) {
    imgurl = imgPreview
  } else if (partyAlreadyAdded) {
    imgurl = `${BASE_URL}/${miscellaneousRed?.party.imgPath}/${miscellaneousRed?.party.imgName}`;
  } else {
    imgurl = userImg;
  }

  return (
    <BodyLayout userType={userType}>
      <Container>
        <ContainerLabel label="Your Electrol Party" />
        <Box sx={{ py: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Box sx={{ width: '100%', height: '400px' }} >
                <img src={imgurl} alt="user img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
              {!partyAlreadyAdded && <Box>
                <Button onClick={uploadImgHandler} variant='outlined' startIcon={<AiOutlineUpload />} >Upload Symbol</Button>
                <input type='file' hidden ref={inputFileRef} onChange={fileImgChangeHandler} />
              </Box>}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper sx={{ px: 2 }}>
              <Box sx={{ py: 2 }} >
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Party Name"
                  placeholder="Your Full Name"
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.partyName : name}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CgRename /></InputAdornment> }}
                  onChange={e => setName(e.target.value)}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Party Symbol Name"
                  placeholder="Party Symbol Name"
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.symbolName : symbolName}
                  InputProps={{ startAdornment: <InputAdornment position="start"><MdEmojiSymbols /></InputAdornment> }}
                  onChange={e => setSymbolName(e.target.value)}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="Candidate Name"
                  placeholder="Main Candidate/MLA Name"
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.candidateName : candidateName}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BsFillPersonLinesFill /></InputAdornment> }}
                  onChange={e => setCandidateName(e.target.value)}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={partyAlreadyAdded ? miscellaneousRed?.party?.state : state}
                    label="State"
                    onChange={stateHandler}
                    disabled={partyAlreadyAdded ? true : false}
                  >
                    {configRed.states.map((state, i) => <MenuItem key={`menuItem_${i}`} value={state}>{state}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ py: 2 }}>
                <TextField
                  sx={{ width: '100%' }}
                  required
                  id="outlined-required"
                  label="District"
                  placeholder="District"
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.district : district}
                  onChange={e => setDistrict(e.target.value)}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Whats your party moto"
                  minRows={3}
                  style={{ width: "100%", padding: "20px" }}
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.moto : moto}
                  onChange={e => setMoto(e.target.value)}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Whats your party vision"
                  minRows={3}
                  style={{ width: "100%", padding: "20px" }}
                  onChange={e => setVision(e.target.value)}
                  value={partyAlreadyAdded ? miscellaneousRed?.party?.vision : vision}
                  disabled={partyAlreadyAdded ? true : false}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                {partyAlreadyAdded ?
                  <Typography>Party details cant be change</Typography> :
                  <Button onClick={updatePartyInfoHandler} fullWidth variant='contained' startIcon={<AiOutlineUsergroupAdd />} >Update Party Info</Button>
                }
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BodyLayout>
  )
}
