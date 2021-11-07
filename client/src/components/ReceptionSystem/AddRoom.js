import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from 'react-router';
const AddRoom = () => {
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log("liol");
  };


  return (
    <Box>
      <Typography variant="h5">Naujo kambario kūrimas</Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={6} fullWidth>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <TextField
                minWidth={200}
                name="floor"
                required
                fullWidth
                id="floor"
                label="Aukštas"
                autoFocus
              />
              <TextField
                required
                fullWidth
                id="roomNumber"
                label="Kambario numeris"
                name="roomNumber"
              />
              <TextField
                required
                fullWidth
                id="numOfBeds"
                label="Lovų skaičius"
                name="numOfBeds"
              />
              <TextField
                id="description"
                label="Aprašymas"
                multiline
                rows={4}
              />
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="roomType" required>
                  Kambario tipas
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="roomType"
                  autoWidth
                  label="Kambario tipas"
                >
                  <MenuItem value={"Ekonominis"}>Ekonominis</MenuItem>
                  <MenuItem value={"Standartinis"}>Standartinis</MenuItem>
                  <MenuItem value={"Prabangus"}>Prabangus</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="roomView" required>
                  Vaizdas
                </InputLabel>
                <Select
                  labelId="roomViewLabel"
                  id="roomView"
                  autoWidth
                  label="Vaizdas"
                >
                  <MenuItem value={"Į gatvę"}>Į gatvę</MenuItem>
                  <MenuItem value={"Į upę"}>Į upę</MenuItem>
                  <MenuItem value={"Į senamiestį"}>Į senamiestį</MenuItem>
                  <MenuItem value={"Į parką"}>Į parką</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="roomSize">Kambario dydis</InputLabel>
                <Input
                  id="roomSize"
                  endAdornment={
                    <InputAdornment position="end">m{"\xB2"}</InputAdornment>
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="roomPrice">Kambario kaina</InputLabel>
                <Input
                  id="roomPrice"
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 220 }} variant="standard">
                <InputLabel htmlFor="roomMaintainancePrice">
                  Kambario išlaikymo kaina
                </InputLabel>
                <Input
                  id="roomMaintainancePrice"
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel control={<Checkbox />} label="Televizorius" />
              <FormControlLabel control={<Checkbox />} label="Internetas" />
              <FormControlLabel control={<Checkbox />} label="Seifas" />
              <FormControlLabel control={<Checkbox />} label="Vonia" />
              <FormControlLabel control={<Checkbox />} label="Mini baras" />
            </Stack>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=>{history.push('/registratura/kambariai')}}>
          Sukurti
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoom;
