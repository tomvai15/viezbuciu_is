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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import adminService from '../../services/admin.services'


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


function createData(name, surname, workplace, email, phone,birthdate,startdate,salary,personcode,workagr,id) {
  return { name, surname, workplace, email, phone,birthdate,startdate,salary,personcode,workagr,id };
}

const rows = [
  createData('Petras', 'Petrulis', 'Virtuvė', 'petras@gmail.com','868198856',"1999-01-03","2021-01-03",1000,"50012324457","Terminuota","abcc123"),
  createData('Vaclovas', 'Vaclovas', 'Registratūra', 'vaciukas69@gmail.com','868198856',"1999-01-03","2021-01-03",1000,"50012324457","Terminuota","abcc123"),
  createData('Vitalijus', 'Vitalijus', 'Virtuvė', 'vitalijus@gmail.com', '868198856',"1999-01-03","2021-01-03",1000,"50012324457","Terminuota","abcc123"),
  createData('Kristina', 'Kristina', 'Registratūra', 'kristina@gmail.com', '868198856',"1999-01-03","2021-01-03",1000,"50012324457","Terminuota","abcc123"),
  createData('Renata', 'Renata', 'Virtuvė', 'renata@gmail.com', '868198856',"1999-01-03","2021-01-03",1000,"50012324457","Terminuota","abcc123"),
];

export default function Workers() {
  const history = useHistory();
  const [selectedId, setSelectedId] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [workers, setWorkers] = React.useState([]);
  const [workplace, setWorkplace] = React.useState(0);
  
  function downloadData(place)
  {
    adminService.getWorkers(place).then((res)=>{
      const workers = res.data.data;
      console.log(workers);
      setWorkers(workers.map(worker=> createData(worker.vardas,worker.pavarde,worker.darbo_vieta=="r_darbuotojas" ? "Registratūra" : "Virtuvė",worker.el_pastas,worker.telefono_numeris,worker.gimimo_data.substring(0,10),worker.idarbinimo_data.substring(0,10),worker.atlyginimas,worker.asmens_kodas,worker.darbo_sutartis,worker.id)));
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
  }
  useEffect(() => {
    downloadData(0);
  },[])

  const handleWorkplaceChange=(event) => {
    const w  = event.target.value;
    setWorkplace(w);
    downloadData(w);
  };

  const handleClickOpen = (id) => {
    console.log(id)
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    adminService.removeWorker(selectedId).then((res)=>{
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
      <Typography variant="h7">
          Darbuotojų filtras:   
      </Typography>
       <Select id="dv" value={workplace} onChange={handleWorkplaceChange}>
          <MenuItem value={0}>Visi darbuotojai</MenuItem>
          <MenuItem value={1}>Virtuvės darbuotojai</MenuItem>
          <MenuItem value={2}>Registratūros darbuotojai</MenuItem>
        </Select>
      <Dialog
        open={open}
        onClose={confirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ar tikrai norite pašalinti darbuotoją?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Darbuotojas bus pašalintas visam laikui
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={confirmDelete} autoFocus>Pašalinti</Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table sx={{ width: 1800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Darbuotojo ID</TableCell>
            <TableCell>Vardas</TableCell>
            <TableCell >Pavardė</TableCell>
            <TableCell >Darbo vieta</TableCell>
            <TableCell>El. Paštas</TableCell>
            <TableCell>Telefono numeris</TableCell>
            <TableCell>Įsidarbinimo data</TableCell>
            <TableCell>Gimimo data</TableCell>
            <TableCell>Atlyginimas</TableCell>
            <TableCell>Asmens kodas</TableCell>
            <TableCell>Darbo sutartis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{row.id}</TableCell>
              <TableCell  component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.workplace}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
            <TableCell>{row.startdate}</TableCell>
            <TableCell>{row.birthdate}</TableCell>
            <TableCell>{row.salary}</TableCell>
            <TableCell>{row.personcode}</TableCell>
            <TableCell>{row.workagr}</TableCell>
              <TableCell><RemoveButton action={()=>{handleClickOpen(row.id)}} /></TableCell>
              <TableCell>
                <EditButton action={()=>{history.push('/administracija/edit/'+row.id)}}/></TableCell>
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