import * as React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router";
import { useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  RemoveButton,
  EditButton,
  AddButton,
  AddFoodButton,
} from "../CommonFunctions/Buttons";
import authService from "../../services/auth.service";
import clientServices from "../../services/client.services";

function createData(id, start, end, type, bedAmount, breakfast, price) {
  return { id, start, end, type, bedAmount, breakfast, price };
}

const rows = [
  createData(
    1,
    "2021-04-04",
    "2021-04-06",
    "Ekonominis",
    2,
    "Užsakyta",
    123.99
  ),
  createData(2, "2021-12-04", "2021-12-23", "Standartinis", 4, "", 123.99),
  createData(3, "2022-04-10", "2022-04-13", "Prabangus", 2, "Užsakyta", 123.99),
];

export default function Rezervations() {
  const [reservations, setReservations] = React.useState([]);
  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user);
    clientServices.getReservations(user.id).then((res)=>{
      const reservations = res.data.data;
      setReservations(reservations.map(reservation=> createData(reservation.id_Rezervacija, reservation.pradzia, reservation.pabaiga, reservation.kambario_tipas, reservation.lovu_skaicius, reservation.pusryciai, reservation.kaina)));
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
  },[])
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
          {"Ar tikrai norite pašalinti rezervaciją?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Rezervacija bus pašalintas visam laikui
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={handleClose} autoFocus>
            Pašalinti
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pradžios data</TableCell>
              <TableCell>Pabaigos data</TableCell>
              <TableCell>Kambarys</TableCell>
              <TableCell>Lovų kiekis</TableCell>
              <TableCell>Pusryčiai</TableCell>
              <TableCell>Kaina</TableCell>
              <TableCell>Rezervacijos būsena</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.start}
                </TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.bedAmount}</TableCell>
                <TableCell>{row.breakfast}</TableCell>
                <TableCell>{row.price}</TableCell>
                {Date.parse(row.start) > new Date() ? (
                  <TableCell>Rezervacija neprasidėjusi</TableCell>
                ) : Date.parse(row.end) > new Date() ? (
                  <TableCell>Rezervacija vykdoma</TableCell>
                ) : (
                  <TableCell>Rezervacija pasibaigusi</TableCell>
                )}
                {Date.parse(row.start) > new Date() ? (
                  <div>
                  <TableCell>
                    <RemoveButton action={handleClickOpen} />
                  </TableCell>
                  <TableCell>
                    <EditButton
                      action={() => {
                        history.push("/klientas/edit/69");
                      }}
                    />
                  </TableCell>
                </div>
                ) : Date.parse(row.end) > new Date() ? (
                    <TableCell>
                    <AddFoodButton
                      action={() => {
                        history.push("/klientas/foodorders/"+row.id);
                      }}
                    />
                  </TableCell>
                ) : (
                    <TableCell></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <AddButton
        action={() => {
          history.push("/klientas/add");
        }}
        name={"Kurti revervaciją"}
      />
    </Box>
  );
}
