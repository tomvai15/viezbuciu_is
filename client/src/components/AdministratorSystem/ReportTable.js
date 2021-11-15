import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';





  function preventDefault(event) {
    event.preventDefault();
  } 

const ReportTable = ({data}) => {
    return (
        <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell align="right">Pajamos</TableCell>
              <TableCell align="right">Išlaidos</TableCell>
              <TableCell align="right">Pajamos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.date}</TableCell>
                <TableCell align="right">{`€${d.income}`}</TableCell>
                <TableCell align="right">{`€${d.costs}`}</TableCell>
                <TableCell align="right">{`€${d.profit}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>       
      </React.Fragment>
    )
}

export default ReportTable


