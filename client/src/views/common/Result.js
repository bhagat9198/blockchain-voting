import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'
import MuiTableAdvance from '../../components/MuiTableAdvance'
import { BsCaretRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminSettings as adminSettingsFun } from './../../store/actions/common'
import getWeb3 from './../../getWeb3';
import VotingContractRaw from './../../contracts/Voting.json';
import { getParty as getPartyFun } from '../../store/actions/common';


const columns = [
  {
    id: 'Electoral Party Name',
    numeric: false,
    disablePadding: true,
    label: 'Electoral Party Name',
  },
  {
    id: 'Candidate Name',
    numeric: true,
    disablePadding: false,
    label: 'Candidate Name',
  },
  {
    id: 'Votes',
    numeric: true,
    disablePadding: false,
    label: 'Votes',
  },
  {
    id: 'District',
    numeric: true,
    disablePadding: false,
    label: 'District',
  },
  {
    id: 'Place',
    numeric: true,
    disablePadding: false,
    label: 'Place',
  },
];

export default function Result(props) {
  const { userType } = props;
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [votingResults, setVotingResults] = useState([]);
  const [allResultsData, setAllResultsData] = useState([]);
  const configRedData = useSelector(state => state.configRed);
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const adminSettings = miscellaneousRed.settings;
  // const navigate = useNavigate();
  const location = useLocation()
  // console.log('Result :: location :: ', location);
  const { search: queryParams } = useLocation()
  const dispatch = useDispatch();
  const userRed = useSelector(state => state.userRed);

  useEffect(() => {
    if (adminSettings.updated) return;

    async function asyncFun() {
      const res = await dispatch(adminSettingsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  useEffect(() => {
    if(!adminSettings.results) return;

    async function asyncFun() {
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

      const req = await contract.methods.getAllData().call();
      console.log('updatePartyInfoHandler :: req :: ', req);
      setVotingResults(req);
    }
    asyncFun();
  }, [adminSettings.results])

  useEffect(() => {
    if(votingResults.length === 0) return;

    async function asyncFun() {
      let allData = []
      for(let i = 0; i < votingResults.length; i++) {
        const res = await dispatch(getPartyFun({ partyId: votingResults[i].name, addToRedux: false }));
        if(!res.status) {
          continue
        }
        allData.push({
          ...res.party, voteRecieved: votingResults[i].voteCount
        })
      }
      return allData;
    } 
    asyncFun().then(res => {
      setAllResultsData(res)
    })
  }, [votingResults])


  if (!adminSettings.results && adminSettings.updated) {
    toast.warning('You cant see results at moment. Kindly wait. ');
    return <Navigate replace to={`/${location.pathname.split('/')[1]}${queryParams}`} />
  }

  console.log('Result :: allResultsData :: ', allResultsData);
  return (
    <Grid container style={{ height: '100%' }} >
      <Grid item xs={12} sm={3} style={{ minWidth: '250px', borderRight: '1px solid #DDD', }} >
        <Container>
          <ContainerLabel label="Top Leading Parties" />
          <CardStats heading1={'Party A'} heading2={'Ajiith'} iconName={'RiNumber1'} style={{ m: 2 }} />
          <CardStats heading1={'Party B'} heading2={'Akhil'} iconName={'RiNumber2'} style={{ m: 2 }} />
          <CardStats heading1={'Party c'} heading2={'Govindha'} iconName={'RiNumber3'} style={{ m: 2 }} />
        </Container>
      </Grid>
      <Grid item xs={12} sm={9} >
        <Container>
          <ContainerLabel label="All Top Parties" />
          <Box sx={{ py: 3 }}>
            {allResultsData.length > 0 && <MuiTableAdvance 
              columns={columns}
              rows={allResultsData}
            />}
          </Box>
        </Container>
        {/*  <Divider />
        <Container>
          <ContainerLabel label="Search Specific Party Result" />
          <Box>
            <Grid container spacing={1}>
              <Grid item sm={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    onChange={stateHandler}
                  >
                    {configRedData.states.map((state, index) =>
                      <MenuItem value={state} key={`menu_item_${index}`} >{state}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">District</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district}
                    label="District"
                    onChange={districtHandler}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <Button fullWidth variant='contained' sx={{ px: 5 }}><BsCaretRight style={{ fontSize: '300%' }} /></Button>
              </Grid>
            </Grid>
            <Box sx={{ py: 5 }} >
              <MuiTableAdvance isCkeckboxReq={false} />
            </Box>
          </Box>
        </Container> */}
      </Grid>
    </Grid>
  )
}
