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
                  >Pridėti meniu įrašą
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


function createData(name, description, price, cost, type, size, isVegan) {
  return { name, description, price, cost, type, size, isVegan };
}

const rows = [
  createData('Kepta Duona', 'Kepta duona su česnaku ir sūriu', 4.99, 1.99, 'Užkandis', 'Maža', 'Ne'),
  createData('Kepsnys', 'Kiaulienos kepsnys su BBQ padažu', 9.99, 5.99, 'Pagrindinis Patiekalas', 'Didelė', 'Ne'),
  createData('Cola', 'Gazuotas gėrimas', 2.99, 0.99, 'Gėrimas', 'Maža', 'Taip'),
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
          {"Ar tikrai norite pašalinti meniu įrašą?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Meniu įrašas bus pašalintas visam laikui
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={handleClose} autoFocus>Pašalinti</Button>
        </DialogActions>
      </Dialog>
    <Typography variant="h5" >Virtuvės meniu</Typography><br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pavadinimas</TableCell>
            <TableCell>Aprašymas</TableCell>
            <TableCell>Kaina</TableCell>
            <TableCell>Savikaina</TableCell>
            <TableCell>Tipas</TableCell>
            <TableCell>Porcijos Dydis</TableCell>
            <TableCell>Yra Veganiškas</TableCell>
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
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.isVegan}</TableCell>
              <TableCell><RemoveButton action={handleClickOpen} /></TableCell>
              <TableCell>
                <EditButton action={()=>{history.push('/virtuve/redaguoti/1')}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <AddButton action={()=>{history.push('/virtuve/prideti')}} /> 
    </Box>
  );
}