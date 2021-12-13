import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import { useState } from "react";
import receptionService from "../../services/reception.services";
import authService from '../../services/auth.service';


const AddRoom = () => {
  const history = useHistory();
  
  const [type, setType] = useState(1);
  const [view, setView] = useState(1);
  const [tv, setTv] = useState(false);
  const [internet, setInternet] = useState(false);
  const [safe, setSafe] = useState(false);
  const [bath, setBath] = useState(false);
  const [bar, setBar] = useState(false);

  const [response, setResponse] = useState({ type: 0, message: "" });

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleTvChange = (event) => {
    setTv(event.target.checked);
  };

  const handleSafeChange = (event) => {
    setSafe(event.target.checked);
  };

  const handleBathChange = (event) => {
    setBath(event.target.checked);
  };

  const handleBarChange = (event) => {
    setBar(event.target.checked);
  };

  const handleInternetChange = (event) => {
    setInternet(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const roomData = {
      floor: data.get("floor"),
      roomNumber: data.get("roomNumber"),
      numOfBeds: data.get("numOfBeds"),
      description: data.get("description"),
      type: type,
      view: view,
      roomSize: data.get("roomSize"),
      roomPrice: data.get("roomPrice"),
      roomMaintainancePrice: data.get("roomMaintainancePrice"),
      tv: tv,
      internet: internet,
      safe: safe,
      bath: bath,
      bar: bar,
      receptionist: authService.getCurrentUser()
    };
    console.log(roomData);

    receptionService.addRoom(roomData).then(
      (res) => {
        console.log("OK");
        setResponse({ type: 0, message: "Kambarys sėkmingai pridėtas" });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setResponse({ type: 1, message: resMessage });
      }
    );
    history.push("/registratura/kambariai");
  };

  return (
    <Box>
      <Typography variant="h5">Naujo kambario kūrimas</Typography>
      <br />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                name="description"
                label="Aprašymas"
                multiline
                rows={4}
              />
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="roomType" required>
                  Kambario tipas
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="roomType"
                  name="roomType"
                  // autoWidth
                  label="Kambario tipas"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <MenuItem value={1}>Ekonominis</MenuItem>
                  <MenuItem value={2}>Standartinis</MenuItem>
                  <MenuItem value={3}>Prabangus</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="roomView" required>
                  Vaizdas
                </InputLabel>
                <Select
                  required
                  labelId="roomViewLabel"
                  id="roomView"
                  label="Vaizdas"
                  value={view}
                  onChange={handleViewChange}
                >
                  <MenuItem value={1}>Į gatvę</MenuItem>
                  <MenuItem value={2}>Į upę</MenuItem>
                  <MenuItem value={3}>Į senamiestį</MenuItem>
                  <MenuItem value={4}>Į parką</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="roomSize">Kambario dydis</InputLabel>
                <Input
                  required
                  id="roomSize"
                  name="roomSize"
                  endAdornment={
                    <InputAdornment position="end">m{"\xB2"}</InputAdornment>
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="roomPrice">Kambario kaina</InputLabel>
                <Input
                  required
                  id="roomPrice"
                  name="roomPrice"
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
                  required
                  id="roomMaintainancePrice"
                  name="roomMaintainancePrice"
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox name="tv" checked={tv} onChange={handleTvChange} />
                }
                label="Televizorius"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="internet"
                    checked={internet}
                    onChange={handleInternetChange}
                  />
                }
                label="Internetas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="safe"
                    checked={safe}
                    onChange={handleSafeChange}
                  />
                }
                label="Seifas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="bath"
                    checked={bath}
                    onChange={handleBathChange}
                  />
                }
                label="Vonia"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="bar"
                    checked={bar}
                    onChange={handleBarChange}
                  />
                }
                label="Mini baras"
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" paddingTop={"20px"}>
          <Button
            variant="outlined"
            onClick={() => {
              history.push("/registratura/kambariai");
            }}
          >
            Atšaukti
          </Button>
          <Button type="submit" variant="contained">
            Sukurti
          </Button>
        </Stack>
      </Box>
      <Typography variant="p" color={response.type == 0 ? "green" : "red"}>
        {response.message}
      </Typography>
    </Box>
  );
};

export default AddRoom;
