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
import { useEffect } from 'react';
import authService from "../../services/auth.service";
import clientServices from "../../services/client.services";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
const types = [
  [1, "Standartinis"],
  [2, "Ekonominis"],
  [3, "Prabangus"],
];

export default function EditReservation() {
  const { id } = useParams();
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [type, setType] = React.useState(1);
  const [bedAmount, setBedAmount] = React.useState(null);
  const [breakfast, setbreakfast] = React.useState(false);
  const [response, setResponse] = React.useState({type: 0,message:""})
  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user);
    clientServices.getReservation(id).then((res)=>{
      const reservation = res.data.data;
      console.log(reservation)
      setStart(reservation.pradzia);
      setEnd(reservation.pabaiga);
      setType(reservation.kambario_tipas);
      setBedAmount(reservation.lovu_skaicius);
      setbreakfast(reservation.pusryciai);
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(resMessage);
    });
  },[])

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("pusryciai")
    console.log(breakfast)
    if( start== null || end == null || data.get('bedAmount')<=0 || data.get('type')==null ){
      setResponse({type: 0,message:"Visi laukai yra privalomi. Lovų skaičius turi būti teigiamas skaičius"})
    }
    else{
      console.log(new Date(start))
      console.log(new Date(end))
      const reservationData = {
        start: format(new Date(start), 'yyyy-MM-dd'),
        end: format(new Date(end), 'yyyy-MM-dd'),
        bedAmount:  data.get('bedAmount'),
        type: data.get('type'),
        breakfast: data.get('breakfast') == 'on'? 1:0,
        reservation:id,
      }
      clientServices.updateReservation(reservationData).then((res)=>{
        setResponse({type: 0,message:"Rezervacijos informacija išsaugota"})
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setResponse({type: 1,message:resMessage })
      });
  }
}

  return (
    <Box>
      <Typography variant="h5">Rezervacijos redagavimas</Typography>
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
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                value={start}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sm={12}>
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
          <Grid item xs={4} sm={12}>
            <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
              <InputLabel id="types">Tipas</InputLabel>
              <Select
                labelId="types"
                id="type"
                onChange={handleTypeChange}
                required
                label="Tipas"
                value={type}
                name="type"
              >
                {types.map((type) => (
                  <MenuItem key={type[0]} value={type[0]}>
                    {type[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={12}>
            <TextField
              sx={{ width: 260}}
              key={bedAmount ? 'notLoadedYet' : 'loaded'}
              type="number"
              name="bedAmount"
              id="bedAmount"
              label="Lovų kiekis"
              InputProps={{ inputProps: { min: 1, max: 4 } }}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;

                // if value is not blank, then test the regex
            
                if (e.target.value === '' || re.test(e.target.value)) {
                   setBedAmount(e.target.value)
                }
              }}
              defaultValue={bedAmount}
              required
            />
          </Grid>
          <Grid item xs={4} sm={12}>
          <FormControlLabel control={<Checkbox onClick={(e) => {
                setbreakfast(!breakfast);
              }} checked={breakfast}/>} label="Pusryčiai" name="breakfast" sx={{ margin: 1}}/>
          </Grid>
        </Grid>
        <br/>
        <Typography variant="p" color={response.type==0 ? "green" : "red"}>
        {response.message}
    </Typography>
             <br/>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Redaguoti
        </Button>
      </Box>
    </Box>
  );
}
