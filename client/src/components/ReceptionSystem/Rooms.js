import * as React from "react";
import { Button, Checkbox, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
function RemoveButton({ action }) {
  return (
    <Button
      variant="contained"
      color="warning"
      startIcon={<DeleteIcon />}
      onClick={action}
    >
      Šalinti
    </Button>
  );
}
function AddButton({ action }) {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={action}
      startIcon={<AddIcon />}
    >
      Pridėti kambarį
    </Button>
  );
}
function EditButton({ action }) {
  return (
    <Button variant="contained" color="primary" onClick={action}>
      Redaguoti
    </Button>
  );
}

function createData(
  free,
  number,
  floor,
  beds,
  description,
  type,
  view,
  size,
  price,
  maintainancePrice,
  tv,
  internet,
  safe,
  bath,
  bar
) {
  return {
    free,
    number,
    floor,
    beds,
    description,
    type,
    view,
    size,
    price,
    maintainancePrice,
    tv,
    internet,
    safe,
    bath,
    bar,
  };
}

const rows = [
  createData(
    true,
    "101",
    "1",
    2,
    "Tikrai neįdomus ir ilgas aprašymas kuris netelpa normaliai",
    "Ekonominis",
    "Į gatvę",
    30.5,
    46.99,
    10.5,
    false,
    true,
    false,
    true,
    false
  ),
  createData(
    false,
    "201",
    "2",
    2,
    "Kažkoks labai įdomus, bet ilgas aprašymas kuris netelpa normaliai",
    "Standartinis",
    "Į upę",
    37,
    50,
    20.5,
    true,
    false,
    false,
    true,
    false
  ),
  createData(
    false,
    "420",
    "4",
    4,
    "Nuostabus kambarys",
    "Prabangus",
    "Į senamiestį",
    80.5,
    123.21,
    40,
    true,
    true,
    true,
    true,
    true
  ),
  createData(
    true,
    "101",
    "1",
    3,
    "Jaunavedžių svajonių kambarys",
    "Stadartinis",
    "Į parką",
    40.25,
    56.44,
    10.1,
    true,
    true,
    false,
    true,
    false
  ),
  createData(
    false,
    "102",
    "1",
    1,
    "Vieną kartą atvykę, atvyksite ir dar kartą",
    "Ekonominis",
    "Į gatvę",
    28,
    20.02,
    5,
    false,
    false,
    false,
    false,
    false
  ),
];

export default function Rooms() {
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
          {"Ar tikrai norite pašalinti kambarį?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kambarys bus pašalintas visam laikui
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
              <TableCell>Laisvas</TableCell>
              <TableCell>Numeris</TableCell>
              <TableCell>Aukštas</TableCell>
              <TableCell>Lovų skaičius</TableCell>
              <TableCell>Aprašymas</TableCell>
              <TableCell>Tipas</TableCell>
              <TableCell>Vaizdas</TableCell>
              <TableCell>Dydis</TableCell>
              <TableCell>Kaina</TableCell>
              <TableCell>Išlaikymo kaina</TableCell>
              <TableCell>Televizorius</TableCell>
              <TableCell>Internetas</TableCell>
              <TableCell>Seifas</TableCell>
              <TableCell>Vonia</TableCell>
              <TableCell>Mini baras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.free ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.floor}</TableCell>
                <TableCell>{row.beds}</TableCell>
                <TableCell wrap="nowrap">
                  <Typography noWrap width={250}>
                    {row.description}
                  </Typography>
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Typography noWrap>{row.view} </Typography>
                </TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.maintainancePrice}</TableCell>
                <TableCell>
                  <Checkbox disabled checked={row.tv} />
                </TableCell>
                <TableCell>
                  <Checkbox disabled checked={row.internet} />
                </TableCell>
                <TableCell>
                  <Checkbox disabled checked={row.safe} />
                </TableCell>
                <TableCell>
                  <Checkbox disabled checked={row.bath} />
                </TableCell>
                <TableCell>
                  <Checkbox {..."HI"} disabled checked={row.bar} />
                </TableCell>
                <TableCell>
                  <RemoveButton action={handleClickOpen} />
                </TableCell>
                <TableCell>
                  <EditButton
                    action={() => {
                      history.push("/registratura/edit/66");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <AddButton
        action={() => {
          history.push("/registratura/add");
        }}
      />
    </Box>
  );
}
