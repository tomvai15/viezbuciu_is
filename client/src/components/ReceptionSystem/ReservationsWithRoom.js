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

function createData(
  id,
  room,
  name,
  surname,
  email,
  start,
  end,
  type,
  bedAmount,
  breakfast,
  price
) {
  return {
    id,
    room,
    name,
    surname,
    email,
    start,
    end,
    type,
    bedAmount,
    breakfast,
    price,
  };
}

const rows = [
  createData(
    1,
    "501",
    "Jonas",
    "Jonaitis",
    "jonas@pastas.lt",
    "2021-04-04",
    "2021-04-06",
    "Ekonominis",
    2,
    "Užsakyta",
    123.99
  ),
  createData(
    2,
    "220",
    "Paulius",
    "Pauliukas",
    "paulius@pastas.lt",
    "2021-11-04",
    "2021-12-09",
    "Standartinis",
    4,
    "",
    123.99
  ),
  createData(
    3,
    "-",
    "Petras",
    "Petraitis",
    "petras@pastas.lt",
    "2022-04-10",
    "2022-04-13",
    "Prabangus",
    2,
    "Užsakyta",
    123.99
  ),
  createData(
    4,
    "-",
    "Kazimieras",
    "Kazlauskas",
    "kazys@pastas.lt",
    "2022-04-11",
    "2022-04-12",
    "Prabangus",
    1,
    "Užsakyta",
    100.99
  ),
];

export default function RezervationsWithRoom() {
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
                    <SetRoomButton action={handleClickOpen} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
