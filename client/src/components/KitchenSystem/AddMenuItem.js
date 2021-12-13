import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react';
import authService from '../../services/auth.service';

const AddMenuItem = () => {
    const user = authService.getCurrentUser()
    console.log(user)
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [price, setPrice] = React.useState(1)
    const [cost, setCost] = React.useState(1)
    const [type, setType] = React.useState(1)
    const [size, setSize] = React.useState(1)
    const [isVegan, setIsVegan] = React.useState(1) 
    const [response, setResponse] = React.useState({type: 0,message:""})

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };
      
    return (
        <Box>
            <Typography variant="h5">
               Naujo meniu įrašo kūrimas
            </Typography>
            <br/>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid  container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Pavadinimas"
                    name="name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="description"
                    label="Aprašymas"
                    name="description"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    type="number"
                    id="price"
                    label="Kaina"
                    name="price"
                    inputProps={{
                        step: "0.1"
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    type="number"
                    id="cost"
                    label="Savikaina"
                    name="cost"
                    inputProps={{
                        step: "0.1"
                    }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <InputLabel id="label-type">Tipas *</InputLabel>
                        <Select
                            labelId="label-type"
                            id="type"
                            required
                            label="Tipas *"
                        >
                            <MenuItem value={1}>Užkandis</MenuItem>
                            <MenuItem value={2}>Pagrindinis patiekalas</MenuItem>
                            <MenuItem value={3}>Gėrimas</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <InputLabel id="size-label">Porcijos dydis *</InputLabel>
                        <Select
                            labelId="size-label"
                            id="size"
                            label="Porcijos dydis *"
                            required
                        >
                            <MenuItem value={1}>Didelė</MenuItem>
                            <MenuItem value={2}>Maža</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch/>} label="Ar veganiškas" />
                    </FormGroup>
                </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
            >
              Sukurti
            </Button>
          </Box>
        </Box>
    )
}

export default AddMenuItem
