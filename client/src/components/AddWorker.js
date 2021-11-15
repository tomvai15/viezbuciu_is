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

const AddWorker = () => {
  const { id } = useParams();
  const [type,setType] =useState('test')
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      console.log("liol");
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
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid  container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
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
            required
            fullWidth
            id="email"
            label="El. paštas"
            name="email"
            autoComplete="email"
          />
        </Grid>
       
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Telefono num."
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Įsidarbinimo data"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Gimimo data"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Atlyginimas"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Asmens kodas"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Darbo sutartis"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <InputLabel id="dv">Darbo vieta</InputLabel>
          <Select fullWidth
          id="dv"
          label="Darbo vieta"
          value={type}
          onChange={handleChange}
          

        >
          <MenuItem value={"Virtuvė"}>Virtuvė</MenuItem>
          <MenuItem value={"Registratūra"}>Registratūra</MenuItem>
        </Select>
        </Grid>
        </Grid> 
        <br/>              

      { type === "Virtuvė" ? <Grid  container spacing={2}>
       <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Pareigos"
            name="email"
            autoComplete="email"
          />
        </Grid> 
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Pamainos tipas"
            name="email"
            autoComplete="email"
          />
        </Grid> </Grid>: <Grid  container spacing={2}> 
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Etatas"
            name="email"
            autoComplete="email"
          />
        </Grid> 
        
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Darbo stalo numeris"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={6}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Manageris" />
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
  </Box>
    )
}

export default AddWorker
