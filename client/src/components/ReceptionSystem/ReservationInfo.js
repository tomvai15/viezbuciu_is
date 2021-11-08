import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const types = [
  [1, "Standartinis"],
  [2, "Ekonominis"],
  [3, "Prabangus"],
];

export default function ReservationInfo() {
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
      <Typography variant="h5">Rezervacijos informacija</Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              defaultValue="Jonas"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Vardas"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              required
              fullWidth
              id="lastName"
              label="Pavardė"
              name="lastName"
              defaultValue="Petrulis"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              defaultValue="jonas@pastas.lt"
              required
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled
                disablePast
                label="Pražios data"
                openTo="day"
                views={["year", "month", "day"]}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                value={Date.parse("2022-01-01")}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled
                disablePast
                label="Pabaigos data"
                openTo="day"
                views={["year", "month", "day"]}
                minDate={start}
                value={Date.parse("2022-01-05")}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl disabled sx={{ m: 1, width: 260, margin: 0 }}>
              <InputLabel id="types">Tipas</InputLabel>
              <Select
                labelId="types"
                id="type"
                onChange={handleTypeChange}
                required
                label="Tipas"
                value={"Standartinis"}
              >
                {types.map((type) => (
                  <MenuItem key={type[0]} value={type[1]}>
                    {type[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              sx={{ width: 260 }}
              type="number"
              name="bedAmount"
              id="bedAmount"
              label="Lovų kiekis"
              InputProps={{ inputProps: { min: 1, max: 4 } }}
              onChange={(newValue) => {
                setbedAmount(newValue);
              }}
              defaultValue={2}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  onClick={(newValue) => {
                    setbreakfast(newValue);
                  }}
                  checked={true}
                />
              }
              label="Pusryčiai"
              sx={{ margin: 1 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
