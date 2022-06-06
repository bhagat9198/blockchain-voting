import { Button, Container, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ContainerLabel from '../../components/ContainerLabel'
import { adminSettings as adminSettingsFun } from './../../store/actions/common';


export default function VoteState(props) {
  const { userType } = props;
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const adminSettings = miscellaneousRed.settings;
  const navigate = useNavigate();
  const { search: queryParams } = useLocation()
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(adminSettingsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  return (
    <Container sx={{ py: 3 }} >
      <ContainerLabel label="Voting Status" />
      {adminSettings?.votingPhase && (<Box className='flex justifyCenter' >
        <Button
          onClick={() => navigate(`/${userType}/vote${queryParams}`)}
          variant='contained'> Voting pahase is open : Cast Your Vote Now
        </Button>
      </Box>)}
      {adminSettings?.results && <Box className='flex justifyCenter' >
        <Button
          onClick={() => navigate(`/${userType}/results${queryParams}`)}
          variant='contained'> Voting pahase is closed : Check election results </Button>
      </Box>}
    </Container>
  )
}
