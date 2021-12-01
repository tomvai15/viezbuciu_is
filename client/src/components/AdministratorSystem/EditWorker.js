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
import { useEffect } from 'react';

function createData(id,name,surname,email,phone,birthDate,startDate,salary,personCode,workAgr, workplace, duties, shift, time,tableNum, isManager) {
  return { id,name, surname, email, phone,birthDate,startDate,salary,personCode,workAgr,workplace,duties,shift,time,tableNum,isManager};
}
const EditWorker = () => {

  const [worker, setWorker] = useState(createData("","","","","",new Date(),new Date(),"","",1,1,"",1,"","",false))

  const { id } = useParams();

  const [response, setResponse] = useState({type: 0,message:""})

  useEffect(() => {
    adminService.getWorker(id).then((res)=>{
      console.log(res.data.data);
      const w = res.data.data;
      setWorker(createData(w.id,w.vardas,w.pavarde,w.el_pastas,w.telefono_numeris,new Date(w.gimimo_data),new Date(w.idarbinimo_data),w.atlyginimas,w.asmens_kodas,w.darbo_sutartis,w.workplace,w.pareigos,w.pamaina,w.etatas,w.darbo_stalo_numeris,w.manegeris))
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

 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let w = {...worker}

    w.birthDate=worker.birthDate.getFullYear()+"-"+(worker.birthDate.getMonth()+1)+"-"+worker.birthDate.getDate()
    w.startDate=worker.startDate.getFullYear()+"-"+(worker.startDate.getMonth()+1)+"-"+worker.startDate.getDate()

    adminService.updateWorker(w).then((res)=>{
      console.log("OK")
      setResponse({type: 0,message:"Darbuotojo informacija išsaugota"})
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
  return (
    <Box>
    <Typography variant="h5">
        Darbuotojo informacijos redagavimas
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
          value={worker.name}
          onChange={(event)=>setWorker({...worker,name:event.target.value})}
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
          value={worker.surname}
          onChange={(event)=>setWorker({...worker,surname:event.target.value})}
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
          value={worker.email}
          onChange={(event)=>setWorker({...worker,email:event.target.value})}
     
     />
      </Grid>
     
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          id="phone"
          label="Telefono num."
          name="phone"
          value={worker.phone}
          onChange={(event)=>setWorker({...worker,phone:event.target.value})}
     
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
              value={worker.startDate}
              onChange={(event)=>setWorker({...worker,startDate:event})}    
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
              value={worker.birthDate}
              onChange={(event)=>setWorker({...worker,birthDate:event})}    
          
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
          value={worker.personCode}
          onChange={(event)=>setWorker({...worker,personCode:event.target.value})}    
     
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
          value={worker.salary}
          onChange={(event)=>setWorker({...worker,salary:event.target.value})}    
     
        />
      </Grid>
     
      <Grid item xs={6}>
      <InputLabel id="dv">Darbo sutartis</InputLabel>
          <Select fullWidth
          id="workAgr"
          label="Darbo sutartis"
          value={worker.workAgr}
          onChange={(event)=>setWorker({...worker,workAgr:event.target.value})}    
     
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
          value={worker.workplace}
          onChange={(event)=>setWorker({...worker,workplace:event.target.value})}    
          disabled
        >
          <MenuItem value={0}>Virtuvė</MenuItem>
          <MenuItem value={1}>Registratūra</MenuItem>
        </Select> 
      </Grid>
      </Grid> 
      <br/>              

    { worker.workplace === 0 ? <Grid  container spacing={2}>
     <Grid item xs={6}>
        <TextField
          required
          fullWidth
          id="duties"
          label="Pareigos"
          name="duties"
          value={worker.duties}
          onChange={(event)=>setWorker({...worker,duties:event.target.value})}    
     
        />
      </Grid> 
      <Grid item xs={6}>
       <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
        <InputLabel id="shift">Pamainos tipas</InputLabel>
          <Select fullWidth
          id="shift"
          labelId="shift"
          label="Pamainos tipas"
          value={worker.shift}
          onChange={(event)=>setWorker({...worker,shift:event.target.value})}    
     
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
          value={worker.time}
          onChange={(event)=>setWorker({...worker,time:event.target.value})}    
     
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
          value={worker.tableNum}
          onChange={(event)=>setWorker({...worker,tableNum:event.target.value})}    
     
        />
      </Grid>
      <Grid item xs={6}>
      <FormControlLabel control={<Checkbox checked={worker.isManager}
          onChange={(event)=>setWorker({...worker,isManager:event.target.checked})}    
      />}  id="isManager" label="Manageris" />
      </Grid>

      </Grid> }



    <Button
      type="submit"
      variant="contained"
      sx={{ mt: 3, mb: 2, }}
    >
      Išsaugoti
    </Button>

  </Box>
  <Typography variant="p" color={response.type==0 ? "green" : "red"}>
        {response.message}
    </Typography>
</Box>
  )
}

export default EditWorker
