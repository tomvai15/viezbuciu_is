import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react'
import { useParams } from 'react-router-dom';

const types = [
    "Užkandis",
    "Pagrindinis patiekalas",
    "Gėrimas",
];

const sizes = [
    "Didelė",
    "Maža",
];

const EditMenuItem = () => {
    const { id } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };
      
    return (
        <Box>
            <Typography variant="h5">
               Meniu įrašo redagavimas
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
                    defaultValue="Pavadinimas"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="description"
                    label="Aprašymas"
                    name="description"
                    defaultValue="Aprašymas"
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
                    defaultValue={9.99}
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
                    defaultValue={9.99}
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
                            {types.map((type) => (
                                <MenuItem value={type}>
                                    {type}
                                </MenuItem>
                            ))}
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
                            {sizes.map((size) => (
                                <MenuItem value={size}>
                                    {size}
                                </MenuItem>
                            ))}
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

export default EditMenuItem
