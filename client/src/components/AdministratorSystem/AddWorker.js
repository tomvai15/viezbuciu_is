import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import adminService from '../../services/admin.services';

const AddWorker = () => {
    const { id } = useParams();
    const [type,setType] =useState(0)
    const [workAgr,setWorkAgr] =useState(1)
    const [shift,setShift] =useState(1)
    const [manager,setManager] =useState(false)
    const [startDate,setStartDate] = useState(new Date())
    const [birthDate,setBirthDate] = useState(new Date())
    const [response, setResponse] = useState({type: 0,message:""})

    const handleManagerChange = (event) => {
      setManager(event.target.checked);
    };
    const handleDateChangeChange = (newValue) => {
      setStartDate(newValue);
    };
    const handleBirthDateChangeChange = (newValue) => {
      setBirthDate(newValue);
    };
    const handleWorkAgrChange = (event) => {

      setWorkAgr(event.target.value);
    };
    const handleShiftChange = (event) => {

      setShift(event.target.value);
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      

      const workerData = {
        name: data.get('name'),
        surname: data.get('surname'),
        email: data.get('email'),
        phone: data.get('phone'),
        birthdate: birthDate.getFullYear()+"-"+birthDate.getMonth()+"-"+birthDate.getDate(),
        startDate: startDate.getFullYear()+"-"+startDate.getMonth()+"-"+startDate.getDate(),
        personCode: data.get('personcode'),
        salary: 500,
        workAgr: workAgr,
        workplace: type,
        duties: data.get('duties'),
        shift: shift,
        time:  data.get('time'),
        tableNum:  data.get('tableNum'),
        manager: manager,
      }
      console.log(workerData)

      adminService.addWorker(workerData).then((res)=>{
        console.log("OK")
        setResponse({type: 0,message:"Darbuotojas sėkmingai pridėtas"})
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
    };
    const handleChange = (event) => {
      setType(event.target.value);
    };
    return (
      <Box>
      <Typography variant="h5">
          Naujo darbuotojo registravimas
      </Typography>
      <br/>
      <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
      <Grid  container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            required
            fullWidth
            id="firstName"
            label="Vardas"
            autoComplete="first-name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="surname"
            label="Pavardė"
            name="surname"
            autoComplete="last-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="El. paštas"
            name="email"
            autoComplete="email"
            type="email"
          />
        </Grid>
       
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Telefono num."
            name="phone"
          />
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} required>
            <DatePicker
                id="startDate"  
                name="startDate"
                label="Įsidarbinimo data"
                openTo="day"
                views={["year", "month", "day"]}
                value={startDate}
                onChange={handleDateChangeChange}
                required
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} required>
            <DatePicker
                id="birthDate"  
                name="birthDate"
                label="Gimimo data"
                openTo="day"
                views={["year", "month", "day"]}
                value={birthDate}
                onChange={handleBirthDateChangeChange}
                required
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="personcode"
            label="Asmens kodas"
            name="personcode"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="salary"
            label="Atlyginimas"
            name="salary"
            type="number"
          />
        </Grid>
       
        <Grid item xs={6}>
        <InputLabel id="dv">Darbo sutartis</InputLabel>
            <Select fullWidth
            id="workAgr"
            label="Darbo sutartis"
            value={workAgr}
            onChange={handleWorkAgrChange}
          >
            <MenuItem value={1}>Terminuota</MenuItem>
            <MenuItem value={2}>Neterminuota</MenuItem>
          </Select> 
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel id="dv">Darbo vieta</InputLabel>
            <Select fullWidth
            id="workplace"
            label="Darbo vieta"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={0}>Virtuvė</MenuItem>
            <MenuItem value={1}>Registratūra</MenuItem>
          </Select> 
        </Grid>
        </Grid> 
        <br/>              

      { type === 0 ? <Grid  container spacing={2}>
       <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="duties"
            label="Pareigos"
            name="duties"
          />
        </Grid> 
        <Grid item xs={6}>
         <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
          <InputLabel id="shift">Pamainos tipas</InputLabel>
            <Select fullWidth
            id="shift"
            labelId="shift"
            label="Pamainos tipas"
            value={shift}
            onChange={handleShiftChange}
          >
            <MenuItem value={1}>Dieninė</MenuItem>
            <MenuItem value={2}>Naktinė</MenuItem>
          </Select> 
          </FormControl>
        </Grid> </Grid>: <Grid  container spacing={2}> 
        <Grid item xs={6}>
          <TextField 
            required
            fullWidth
            id="time"
            label="Etatas"
            name="time"
            type="number"
            InputProps={{ inputProps: {   min: 0, max: 1, step:0.1 } }}
          />
        </Grid> 
        
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="tableNum"
            label="Darbo stalo numeris"
            name="tableNum"
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
        <FormControlLabel control={<Checkbox checked={manager} onChange={handleManagerChange} />}  id="isManager" label="Manageris" />
        </Grid>

        </Grid> }



      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, }}
      >
        Registruoti
      </Button>

    </Box>
    <Typography variant="p" color={response.type==0 ? "green" : "red"}>
          {response.message}
      </Typography>
  </Box>
    )
}

export default AddWorker
