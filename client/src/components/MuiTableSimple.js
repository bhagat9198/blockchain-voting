import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';

export default function MuiTableSimple(props) {
  const { columns, rowsData } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((c, i) => <TableCell key={`${c}_${i}`} align="right">{c}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((row, i) => (
            <TableRow
              key={`${row.name}_${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.data1}
              </TableCell>
              <TableCell align="right">{row.data2}</TableCell>
              <TableCell align="right">{row.data3}</TableCell>
              <TableCell align="right">{row.data4}</TableCell>
              {row?.action?.delete && <TableCell align="right"><Button><AiOutlineDelete /></Button></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


// function createData(name, email, createdOn, createdBy) {
//   return { name, email, createdOn, createdBy };
// }

// const rows = [
//   createData('Dark Alex', 'abc@wer.com', 'Admin 1', '20 Feb'),
//   createData('Dark Alex', 'abc@wer.com', 'Admin 1', '20 Feb'),
// ];






