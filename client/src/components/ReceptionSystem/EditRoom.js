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
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import receptionService from "../../services/reception.services";

function createData(
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

const EditRoom = () => {
  const history = useHistory();
  const [type, setType] = useState(1);
  const [view, setView] = useState(1);
  const [tv, setTv] = useState(false);
  const [internet, setInternet] = useState(false);
  const [safe, setSafe] = useState(false);
  const [bath, setBath] = useState(false);
  const [bar, setBar] = useState(false);
  const [room, setRoom] = useState(
    createData(
      "",
      "",
      "",
      "",
      1,
      1,
      "",
      "",
      "",
      false,
      false,
      false,
      false,
      false
    )
  );

  const { id } = useParams();

  const [response, setResponse] = useState({ type: 0, message: "" });

  useEffect(() => {
    receptionService.getRoom(id).then(
      (res) => {
        console.log(res.data.data);
        const w = res.data.data;
        setRoom(
          createData(
            w.numeris,
            w.aukstas,
            w.lovu_skaicius,
            w.aprasymas,
            w.kambario_tipas,
            w.vaizdas,
            w.kambario_dydis,
            w.kaina,
            w.islaikymo_islaidos,
            w.yra_televizorius == 0 ? false : true,
            w.yra_internetas == 0 ? false : true,
            w.yra_seifas == 0 ? false : true,
            w.yra_vonia == 0 ? false : true,
            w.yra_mini_baras == 0 ? false : true
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

    let w = { ...room };

    receptionService.updateRoom(w).then(
      (res) => {
        console.log("OK");
        setResponse({ type: 0, message: "Kambario informacija išsaugota" });
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
      <Typography variant="h5">Kambario informacijos atnaujinimass</Typography>
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
                value={room.floor}
                onChange={(event) =>
                  setRoom({ ...room, floor: event.target.value })
                }
              />
              <TextField
                // required
                fullWidth
                disabled
                id="roomNumber"
                label="Kambario numeris"
                name="roomNumber"
                value={room.number}
                onChange={(event) =>
                  setRoom({ ...room, number: event.target.value })
                }
              />
              <TextField
                required
                fullWidth
                id="numOfBeds"
                label="Lovų skaičius"
                name="numOfBeds"
                value={room.beds}
                onChange={(event) =>
                  setRoom({ ...room, beds: event.target.value })
                }
              />
              <TextField
                id="description"
                name="description"
                label="Aprašymas"
                multiline
                rows={4}
                value={room.description}
                onChange={(event) =>
                  setRoom({ ...room, description: event.target.value })
                }
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
                  value={room.type}
                  onChange={(event) =>
                    setRoom({ ...room, type: event.target.value })
                  }
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
                  value={room.view}
                  onChange={(event) =>
                    setRoom({ ...room, view: event.target.value })
                  }
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
                  value={room.size}
                  onChange={(event) =>
                    setRoom({ ...room, size: event.target.value })
                  }
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
                  value={room.price}
                  onChange={(event) =>
                    setRoom({ ...room, price: event.target.value })
                  }
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
                  value={room.maintainancePrice}
                  onChange={(event) =>
                    setRoom({ ...room, maintainancePrice: event.target.value })
                  }
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
                  <Checkbox
                    name="tv"
                    checked={room.tv}
                    onChange={(event) =>
                      setRoom({ ...room, tv: event.target.checked })
                    }
                  />
                }
                label="Televizorius"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setRoom({ ...room, internet: event.target.checked })
                    }
                    name="internet"
                    checked={room.internet}
                  />
                }
                label="Internetas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setRoom({ ...room, safe: event.target.checked })
                    }
                    name="safe"
                    checked={room.safe}
                  />
                }
                label="Seifas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setRoom({ ...room, bath: event.target.checked })
                    }
                    name="bath"
                    checked={room.bath}
                  />
                }
                label="Vonia"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setRoom({ ...room, bar: event.target.checked })
                    }
                    name="bar"
                    checked={room.bar}
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
            Atnaujinti
          </Button>
        </Stack>
      </Box>
      <Typography variant="p" color={response.type == 0 ? "green" : "red"}>
        {response.message}
      </Typography>
    </Box>
  );
};

export default EditRoom;
