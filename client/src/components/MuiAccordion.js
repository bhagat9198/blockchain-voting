import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button } from '@mui/material';
import { AiTwotoneDelete } from 'react-icons/ai';

export default function MuiAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { list, handler } = props;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    list && list.map((l, i) =>
      <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${1}bh-content`}
          id={`panel${i}bh-header`}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {l.heading}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{l.subheading}</Typography>
        </AccordionSummary>
        <AccordionDetails className='flex'  >
          <Typography sx={{ flexGrow: 1 }} >
            {l.body}
          </Typography>
          <Button
            sx={{ ml: 3, color: "red" }}
            startIcon={<AiTwotoneDelete style={{ fontSize: '150%' }} />}
            onClick={() => handler(l._id)}
          >
          </Button>
        </AccordionDetails>
      </Accordion>
    )
  );
}
