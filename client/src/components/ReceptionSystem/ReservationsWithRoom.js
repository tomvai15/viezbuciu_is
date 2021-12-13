import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router";

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
  SetRoomButton,
} from "../CommonFunctions/Buttons";
import { useState } from "react";
import receptionService from "../../services/reception.services";
import authService from "../../services/auth.service";
// import clientServices from "../../services/client.services";
import { useEffect } from "react";
import { format } from "date-fns";

function createData(id, start, end, type, bedAmount, breakfast, price, room) {
  return { id, start, end, type, bedAmount, breakfast, price, room };
}
// function createData(
//   id,
//   room,
//   name,
//   surname,
//   email,
//   start,
//   end,
//   type,
//   bedAmount,
//   breakfast,
//   price
// ) {
//   return {
//     id,
//     room,
//     name,
//     surname,
//     email,
//     start,
//     end,
//     type,
//     bedAmount,
//     breakfast,
//     price,
//   };
// }

// const rows = [
//   createData(
//     1,
//     "501",
//     "Jonas",
//     "Jonaitis",
//     "jonas@pastas.lt",
//     "2021-04-04",
//     "2021-04-06",
//     "Ekonominis",
//     2,
//     "Užsakyta",
//     123.99
//   ),
//   createData(
//     2,
//     "220",
//     "Paulius",
//     "Pauliukas",
//     "paulius@pastas.lt",
//     "2021-11-04",
//     "2021-12-09",
//     "Standartinis",
//     4,
//     "",
//     123.99
//   ),
//   createData(
//     3,
//     "-",
//     "Petras",
//     "Petraitis",
//     "petras@pastas.lt",
//     "2022-04-10",
//     "2022-04-13",
//     "Prabangus",
//     2,
//     "Užsakyta",
//     123.99
//   ),
//   createData(
//     4,
//     "-",
//     "Kazimieras",
//     "Kazlauskas",
//     "kazys@pastas.lt",
//     "2022-04-11",
//     "2022-04-12",
//     "Prabangus",
//     1,
//     "Užsakyta",
//     100.99
//   ),
// ];

export default function RezervationsWithRoom() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(201);
  const [response, setResponse] = useState({ type: 0, message: "" });
  const [reservations, setReservations] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(-1);

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user);
    receptionService.getReservations(user.id).then(
      (res) => {
        const reservations = res.data.data;
        console.log(reservations);
        setReservations(
          reservations.map((reservation) =>
            createData(
              reservation.id_Rezervacija,
              reservation.pradzia,
              reservation.pabaiga,
              reservation.name,
              reservation.lovu_skaicius,
              reservation.pusryciai,
              reservation.kaina,
              reservation.fk_Kambarys
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

  const handleClickOpen = (reservation) => {
    setSelectedReservation(reservation);
    setOpen(true);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleClose = () => {
    const data = {
      // reservation: selectedReservation,
      // room: selectedRoom
      reservation: 2,
      room: 121,
    };

    receptionService.assignRoom(data).then(
      (res) => {
        console.log("OK");
        // setResponse({ type: 0, message: "Priskirta" });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        // setResponse({ type: 1, message: resMessage });
      }
    );
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
          {"Pasirinkite kambarį"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="roomType" required>
                Kambario nr.
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="roomType"
                //   autoWidth
                label="Kambario tipas"
                onChange={handleRoomChange}
                value={selectedRoom}
              >
                <MenuItem value={"201"}>201 - Į gatvę</MenuItem>
                <MenuItem value={"202"}>202 - Į upę</MenuItem>
                <MenuItem value={"203"}>203 - Į senamiestį</MenuItem>
                <MenuItem value={"204"}>204 - Į parką</MenuItem>
                <MenuItem value={"401"}>401 - Į parką</MenuItem>
                <MenuItem value={"409"}>409 - Į parką</MenuItem>
                <MenuItem value={"411"}>411 - Į parką</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={handleClose} autoFocus>
            Priskirti
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Priskirtas kambarys</TableCell>
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
                <TableCell>
                  {row.room == null ? (
                    <Typography color="red" fontWeight="bold">
                      —
                    </Typography>
                  ) : (
                    <Typography color="green" fontWeight="bold">
                      {row.room}
                    </Typography>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {format(new Date(row.start), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{format(new Date(row.end), "yyyy-MM-dd")}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.bedAmount}</TableCell>
                <TableCell>{row.breakfast ? "Užsakyta" : ""}</TableCell>
                <TableCell>{row.price.toFixed(2)}</TableCell>
                {Date.parse(row.start) > new Date() ? (
                  <TableCell>Rezervacija neprasidėjusi</TableCell>
                ) : Date.parse(row.end) > new Date() ? (
                  <TableCell>Rezervacija vykdoma</TableCell>
                ) : (
                  <TableCell>Rezervacija pasibaigusi</TableCell>
                )}
                <TableCell>
                  {row.room != null ? (
                    <div></div>
                  ) : (
                    <SetRoomButton
                      action={() => {
                        handleClickOpen(row.id);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Priskirtas kambarys</TableCell>
              <TableCell>Vardas</TableCell>
              <TableCell>Pavardė</TableCell>
              <TableCell>El. paštas</TableCell>
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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.room == "-" ? (
                    <Typography color="red" fontWeight="bold">
                      —
                    </Typography>
                  ) : (
                    <Typography color="green" fontWeight="bold">
                      {row.room}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell component="th" scope="row">
                  {row.start}
                </TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.bedAmount}</TableCell>
                <TableCell>{row.breakfast}</TableCell>
                <TableCell>{row.price}</TableCell>
                {Date.parse(row.start) > new Date() ? (
                  <TableCell>Neprasidėjusi</TableCell>
                ) : Date.parse(row.end) > new Date() ? (
                  <TableCell>Vykdoma</TableCell>
                ) : (
                  <TableCell>Pasibaigusi</TableCell>
                )}

                <TableCell>
                  {row.room != "-" ? (
                    <div></div>
                  ) : (
                    <SetRoomButton
                      action={() => {
                        handleClickOpen(2);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
}
