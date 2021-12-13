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

import { useEffect } from "react";
import kitchenServices from '../../services/kitchen.services';



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
                  >Redaguoti
          </Button>

    )
}


function createData(id, name, description, price, cost, isVegan, type, size) {
  return {id, name, description, price, cost, isVegan, type, size};
}

export default function Workers() {
  const history = useHistory();
  const [menuItems, setMenuItems] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (id) => {
    console.log(id)
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    kitchenServices.getMenu().then(
      (res) => {
        const menuItems = res.data.data;
        setMenuItems(
          menuItems.map((menuItem) =>
            createData(
              menuItem.id_Meniu_irasas,
              menuItem.pavadinimas,
              menuItem.aprasymas,
              menuItem.kaina,
              menuItem.savikaina,
              menuItem.yra_veganiskas,
              menuItem.m_tipas,
              menuItem.p_tipas
            )
          )
        );
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }, []);
  const removeMenuItem = () => {
    kitchenServices.removeMenuItem(selectedId).then((res)=>{
      console.log("ok");
      window.location.reload(false);
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(resMessage);
    });
    setSelectedId(-1);
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
          <Button onClick={removeMenuItem} autoFocus>Pašalinti</Button>
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
            <TableCell>Yra Veganiškas</TableCell>
            <TableCell>Tipas</TableCell>
            <TableCell>Porcijos Dydis</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menuItems.map((menuItem) => (
            <TableRow
              key={menuItem.id_Meniu_irasas}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {menuItem.name}
              </TableCell>
              <TableCell>{menuItem.description}</TableCell>
              <TableCell>{menuItem.price}</TableCell>
              <TableCell>{menuItem.cost}</TableCell>
              <TableCell>{menuItem.isVegan == 1 ? "Taip" : "Ne"}</TableCell>
              <TableCell style={{textTransform: "capitalize"}}>{menuItem.type}</TableCell>
              <TableCell style={{textTransform: "capitalize"}}>{menuItem.size}</TableCell>
              <TableCell><RemoveButton action={()=>{handleClickOpen(menuItem.id)}} /></TableCell>
              <TableCell>
                <EditButton action={()=>{history.push('/virtuve/redaguoti/'+menuItem.id)}}/></TableCell>
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