import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
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
import { adminSettings as adminSettingsFun } from './../../store/actions/common'


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
      rows={[
        {
          data: ['party name 1', 'person name 1', <Button variant='contained' startIcon={<MdOutlineHowToVote />} >Vote</Button>],
          id: 1,
          otherData: { heading: 'About the Party', moto: 'be in peace', vision: 'make a better place' }
        },
        {
          data: ['party name 1', 'person name 1', <Button variant='contained' startIcon={<MdOutlineHowToVote />}>Vote</Button>],
          id: 2,
          otherData: { heading: 'About the Party', moto: 'be in peace', vision: 'make a better place' }
        },
      ]}
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
