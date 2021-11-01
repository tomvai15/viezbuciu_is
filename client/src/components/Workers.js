import * as React from 'react';
import {Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function RemoveButton({action})
{
    return(
          <Button variant="contained"
                  color="warning" 
                  startIcon={<DeleteIcon />}
                  onClick={action}
                  >Šalinti
          </Button>
    )
}
function AddButton({action})
{
    return(
          <Button variant="outlined"
                  color="primary" 
                  onClick={action}
                  startIcon={<AddIcon />}
                  >Pridėti darbuotoją
          </Button>
    )
}
function EditButton({action})
{
    return(
          <Button variant="contained"
                  color="primary" 
                  onClick={action}
                  >Redaguoti</Button>

    )
}


function createData(name, surname, workplace, email, protein) {
  return { name, surname, workplace, email, protein };
}

const rows = [
  createData('Petras', 'Petrulis', 'Virtuvė', 'petras@gmail.com', 4.0),
  createData('Vaclovas', 'Vaclovas', 'Registratūra', 'vaciukas69@gmail.com', 4.3),
  createData('Vitalijus', 'Vitalijus', 'Virtuvė', 'vitalijus@gmail.com', 6.0),
  createData('Kristina', 'Kristina', 'Registratūra', 'kristina@gmail.com', 4.3),
  createData('Renata', 'Renata', 'Virtuvė', 'renata@gmail.com', 3.9),
];

export default function Workers() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ar tikrai norite pašalinti darbuuotoją?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Darbuotojas bus pašalintas visam laikui
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={handleClose} autoFocus>Pašalinti</Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vardas</TableCell>
            <TableCell >Pavardė</TableCell>
            <TableCell >Darbo vieta</TableCell>
            <TableCell>El. Paštas</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.workplace}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell><RemoveButton action={handleClickOpen} /></TableCell>
              <TableCell>
                <EditButton action={()=>{history.push('/administracija/edit/66')}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <AddButton action={()=>{history.push('/administracija/add')}} /> 
    </Box>
  );
}