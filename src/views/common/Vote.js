import { Button, Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiList from '../../components/MuiList'
import { FcAcceptDatabase } from 'react-icons/fc';
import { MdCancelPresentation, MdOutlineHowToVote } from 'react-icons/md';
import MuiTableCollapsible from '../../components/MuiTableCollapsible'

export default function Vote() {
  const configStoreData = useSelector(state => state.configRed);
  const t_c = configStoreData.t_c;

  return (
    <>
      <Container sx={{ pb: 5 }} >
        <ContainerLabel label="Terms and Conditions" />
        <Box>
          <MuiList list={t_c} />
        </Box>
        <Box sx={{ justifyContent: 'space-around', m: 2 }} className="flex" >
          <Button variant='contained' style={{ background: 'green' }} startIcon={<FcAcceptDatabase />} >Accept</Button>
          <Button variant='contained' style={{ background: 'red' }} startIcon={<MdCancelPresentation />} >Reject</Button>
          <Button></Button>
        </Box>
      </Container>
      <Container sx={{ pb: 5 }}>
        <ContainerLabel label="Vote" />
        <MuiTableCollapsible
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
      </Container>
    </>
  )
}
