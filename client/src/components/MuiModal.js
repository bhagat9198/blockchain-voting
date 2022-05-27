import { Button, Card, CardActionArea, CardActions, CardHeader, Modal } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 2,
};

export default function MuiModal(props) {
  const { open, setOpen, title, cardActions, children, style } = props;
  let cardActionsCont = <></>;

  if (cardActions && cardActions.length > 0) {
    cardActionsCont = cardActions.map(action => {
      if (action.label === 'submit') {
        return <Button size="small" sx={{ color: "green" }} onClick={action?.fun}>Submit</Button>
      } else {
        return <></>
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={style}
    >
      <Box sx={modalStyle}>
        <Card sx={{ m: 1 }}>
          <CardActionArea sx={{ p: 2 }}>
            <CardHeader
              sx={{ p: 0 }}
              title={title}
            />
            {children}
          </CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              {cardActionsCont}
            </Box>
            <Button size="small" sx={{ color: "red" }} onClick={() => setOpen(false)}>Close</Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  )
}
