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

function createData(
  id,
  start,
  end,
  type,
  bedAmount,
  breakfast,
  price,
  room,
  number,
  typeId
) {
  return {
    id,
    start,
    end,
    type,
    bedAmount,
    breakfast,
    price,
    room,
    number,
    typeId,
  };
}

export default function RezervationsWithRoom() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(-1);
  const [response, setResponse] = useState({ type: 0, message: "" });
  const [reservations, setReservations] = React.useState([]);
  const [reservation, setReservation] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
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
              reservation.fk_Kambarys,
              reservation.numeris,
              reservation.kambario_tipas
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
    setReservation(reservation.id)
    receptionService
      .getRoomsForAssign(reservation.typeId, reservation.bedAmount)
      .then(
        (res) => {
          const reservations = res.data.data;
          console.log(reservations);
          setRooms(
            reservations.map((reservation) => {
              return {
                kambario_id: reservation.id_Kambarys,
                numeris: reservation.numeris,
                vaizdas: reservation.name,
              };
            })
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
      console.log(rooms.length)
    setSelectedReservation(reservation.id);
    setOpen(true);
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleAssign = () =>{
    const data = {
      // reservation: selectedReservation,
      // room: selectedRoom
      reservation: reservation,
      room: selectedRoom,
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
    window.location.reload(false);
  }



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
                <MenuItem value={-1}>--- Pasirinkite kambarį ----</MenuItem>
                {rooms.map((row) => <MenuItem value={row.kambario_id}>{row.numeris} - {row.vaizdas}</MenuItem>)}

              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atšaukti</Button>
          <Button onClick={handleAssign} autoFocus>
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
                  {row.number == null ? (
                    <Typography color="red" fontWeight="bold">
                      —
                    </Typography>
                  ) : (
                    <Typography color="green" fontWeight="bold">
                      {row.number}
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
                        handleClickOpen(row);
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
