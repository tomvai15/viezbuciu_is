import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const types = [
  [1, "Standartinis"],
  [2, "Ekonominis"],
  [3, "Prabangus"],
];

export default function AddReservation() {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [bedAmount, setbedAmount] = React.useState(2);
  const [breakfast, setbreakfast] = React.useState(false);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log(";)");
  };
  return (
    <Box>
      <Typography variant="h5">Naujos rezervacijos kūrimas</Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={4} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                label="Pražios data"
                openTo="day"
                views={["year", "month", "day"]}
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                label="Pabaigos data"
                openTo="day"
                views={["year", "month", "day"]}
                minDate={start}
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
              <InputLabel id="types">Tipas</InputLabel>
              <Select
                labelId="types"
                id="type"
                onChange={handleTypeChange}
                required
                label="Tipas"
              >
                {types.map((type) => (
                  <MenuItem key={type[0]} value={type[1]}>
                    {type[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              sx={{ width: 260}}
              type="number"
              name="bedAmount"
              id="bedAmount"
              label="Lovų kiekis"
              InputProps={{ inputProps: { min: 1, max: 4 } }}
              onChange={(newValue) => {
                setbedAmount(newValue);
              }}
              required
            />
          </Grid>
          <Grid item xs={4} sm={2}>
          <FormControlLabel control={<Checkbox onClick={(newValue) => {
                setbreakfast(newValue);
              }} />} label="Pusryčiai" sx={{ margin: 1}}/>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sukurti
        </Button>
      </Box>
    </Box>
  );
}
