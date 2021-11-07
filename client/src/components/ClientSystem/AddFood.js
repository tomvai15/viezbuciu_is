import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function createData(date, item, amount, type, price) {
  return { date, item, amount, type, price };
}



  const items = [
    [1, "Fanta"],
    [2, "Coca-cola"],
    [3, "Picamica"],
  ];
  const types = [
    [1, "Prie durų"],
    [2, "Kavinėje"],
  ];

  //could change to a class
export default function AddFood() {
  const history = useHistory();
  const [date, setDate] = React.useState(null);
  const [item, setItem] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [rows, setRows] = React.useState([
    createData(
      "2021-04-04",
      "Coca-cola",
      2,
      "Prie durų",
      4.20
    ),
    createData(    "2021-04-05",
    "Fanta",
    2,
    "Kavinėje",
    6.90),
    ]);
    //Check validation can add empty
  const handleSubmit = ( event) => {
      console.log(event)
      event.preventDefault();//with this disabled it should work 
      const data = new FormData(event.currentTarget);
      console.log(data)
    // eslint-disable-next-line no-console
    console.log(event.target[7].value)
    setRows([...rows,createData(event.target[0].value, event.target[3].value, event.target[5].value, event.target[7].value, "6.90")])
    console.log(";)");
    
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pristatymo data</TableCell>
              <TableCell>Patiekalas</TableCell>
              <TableCell>Kiekis</TableCell>
              <TableCell>Pristatymo tipas</TableCell>
              <TableCell>Kaina</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.price}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
        <Typography variant="h5">Naujas užsakymas</Typography>
        <br />
        <Box component="form"  sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={5} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns} required>
                <DatePicker
                    id="date"
                  label="Data"
                  openTo="day"
                  views={["year", "month", "day"]}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  required
                  minDate={Date.parse("2021-11-01")}
                  maxDate={Date.parse("2022-01-01")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5} sm={2} >
              <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
                <InputLabel id="item">Patiekalas</InputLabel>
                <Select
                  labelId="item"
                  id="item"
                  onChange={(newValue) => {
                    setItem(newValue);
                  }}
                  required
                  label="Patieklas"
                >
                  {items.map((item) => (
                    <MenuItem key={item[0]} value={item[1]}>
                      {item[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5} sm={2}>
              <TextField
                sx={{ width: 260}}
                type="number"
                name="amount"
                id="amount"
                label="Kiekis"
                defaultValue={1}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(newValue) => {
                  setAmount(newValue);
                }}
                required
              />
            </Grid>
            <Grid item xs={5} sm={2}>
              <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
                <InputLabel id="type">Pristatymo būdas</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  onChange={(newValue) => {
                    setType(newValue);
                  }}
                  required
                  label="Pristatymo būdas"
                >
                  {types.map((type) => (
                    <MenuItem key={type[0]} value={type[1]}>
                      {type[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} >
            Sukurti
          </Button>
        </Box>
      </Box>
  );
                  }
