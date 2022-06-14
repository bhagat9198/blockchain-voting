import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiList from '../../components/MuiList'
import { FcAcceptDatabase } from 'react-icons/fc';
import { MdCancelPresentation, MdOutlineHowToVote } from 'react-icons/md';
import MuiTableCollapsible from '../../components/MuiTableCollapsible'
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminSettings as adminSettingsFun, submitVote as submitVoteFun } from './../../store/actions/common'
import { displayElectionParty, initVotingContract } from '../../store/actions/w3Transactions'
import VotingContractRaw from './../../contracts/Voting.json';
import getWeb3 from './../../getWeb3';
import { getParty as getPartyFun } from '../../store/actions/common';
import { userDataSetup as userDataSetupFun } from '../../store/actions/auth'


export default function Vote(props) {
  const { userType } = props;
  const configStoreData = useSelector(state => state.configRed);
  const userRed = useSelector(state => state.userRed);
  // console.log('Vote :: userRed :: ', userRed);
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const adminSettings = miscellaneousRed.settings;
  const navigate = useNavigate();
  const { search: queryParams } = useLocation()
  const dispatch = useDispatch();
  const t_c = configStoreData.t_c;
  const [accept, setAccepted] = useState(false);
  const [allParties, setAllParties] = useState([])
  const [allPartiesData, setAllPartiesData] = useState([])
  const [hasVoted, setHasVoted] = useState(false)


  useEffect(() => {
    if (adminSettings.updated) return;

    async function asyncFun() {
      const res = await dispatch(adminSettingsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
      // displayElectionParty();
    }
    asyncFun()

  }, [])

  useEffect(() => {
    if (!adminSettings.votingPhase) return;

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
      setAllParties(req);
    }
    asyncFun();
  }, [adminSettings.votingPhase])

  useEffect(() => {
    if (allParties.length === 0) return;

    async function asyncFun() {
      let allData = []
      console.log('allParties :: ', allParties);
      for (let i = 0; i < allParties.length; i++) {
        const res = await dispatch(getPartyFun({ partyId: allParties[i].name, addToRedux: false }));
        console.log('res :: ', res);
        if (!res.status) {
          continue
        }
      
        allData.push({
          ...res.party, voteRecieved: allParties[i].voteCount
        })
      }
      console.log(allData);
      return allData;
    }
    asyncFun().then(res => {
      console.log('Vote :: res ::', res);
      setAllPartiesData(res)
    })
  }, [allParties])

  let allUpdatedParties = [];

  allUpdatedParties = allPartiesData.map((party, index) => {
    return {
      data: [
        party.partyName,
        party.candidateName,
        <Button 
          onClick={() => voteSubmitted({ index })}
          disabled={hasVoted ? true : false}
          variant='contained' startIcon={<MdOutlineHowToVote />} >Vote</Button>
      ],
      id: index,
      otherData: {
        heading: party?.account ? party.account : 'Account cannot be seen',
        moto: party?.moto,
        vision: party?.vision
      }
    }
  })

  console.log('Vote :: allUpdatedParties :: ', allUpdatedParties);
  console.log('Vote :: allParties :: ', allParties);
  console.log('Vote :: allPartiesData :: ', allPartiesData);

  const voteSubmitted = async({index}) => {
    if(hasVoted) {
      toast.warning('You have already voted');
      return;
    }
    console.log('Vote :: voteSubmitted :: index :: ', index);
    const web3 = await getWeb3();
    const account = userRed.w3Account;
    console.log('updatePartyInfoHandler :: account :: ', account);
    const networkId = await web3.eth.net.getId();
    // console.log('updatePartyInfoHandler :: networkId :: ', networkId);
    const deployedNetwork = VotingContractRaw.networks[networkId];

    const contract = await new web3.eth.Contract(
      VotingContractRaw.abi,
      deployedNetwork && deployedNetwork.address,
    );
    console.log('updatePartyInfoHandler :: contract :: ', contract);
      let indexNum = Number(index) + 1;
    console.log('Vote :: voteSubmitted :: index :: ', indexNum);
    const req = await contract.methods.vote(indexNum).send({ from: account });
    console.log('updatePartyInfoHandler :: req :: ', req);

    const res = await dispatch(submitVoteFun());
    if(!res.status) {
      toast.error(res.message);
      return
    }
    toast.success('Thanks for giving  the vote.')
    // const ress = await dispatch(userDataSetupFun({ _id: userRed.userData._id, isDev: true, userType: userRed.userData.userType }))
    // console.log('ress :: ', ress);
    // if(!ress.status) {
    //   toast.error(res.message)
    //   return
    // }
    setHasVoted(true)
  }

  const tcList = t_c.map(tc => {
    return {
      label: tc,
      icon: <StarIcon sx={{ color: 'goldenrod' }} />,
    }
  })

  function voteTableUi() {
    if (userRed.userData.hasVoted) {
      return <Typography className='flex alignCenter justifyCenter'>You have already voted. </Typography>;
    }
    if (!accept) {
      return <Typography className='flex alignCenter justifyCenter'>Accept terms and conditions to vote</Typography>;
    }
    return <MuiTableCollapsible
      columns={['Party Name', 'Canditate Name', 'Action']}
      rows={allUpdatedParties}
    />
  }

  if (!adminSettings.votingPhase && adminSettings.updated) {
    toast.warning('Voting time is over. Cant vote as present');
    return navigate(`/${userType}${queryParams}`)
  }

  return (
    <>
      {!userRed?.userData?.hasVoted && !accept && <Container sx={{ pb: 5 }} >
        <ContainerLabel label="Terms and Conditions" />
        <Box>
          <MuiList list={tcList} />
        </Box>
        <Box sx={{ justifyContent: 'space-around', m: 2 }} className="flex" >
          <Button onClick={() => setAccepted(true)} variant='contained' style={{ background: 'green' }} startIcon={<FcAcceptDatabase />} >Accept</Button>
          <Button variant='contained' style={{ background: 'red' }} startIcon={<MdCancelPresentation />} >Reject</Button>
        </Box>
      </Container>}

      <Container sx={{ pb: 5 }}>
        <ContainerLabel label="Vote" />
        {voteTableUi()}
      </Container>
    </>
  )
}
