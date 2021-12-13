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
import kitchenServices from '../../services/kitchen.services';

const AddMenuItem = () => {
    //const user = authService.getCurrentUser()
    const user = 19
    const [type, setType] = React.useState(1)
    const [size, setSize] = React.useState(1)
    const [isVegan, setIsVegan] = React.useState(0) 
    const [response, setResponse] = React.useState({type: 0,message: ""})

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleIsVeganChange = (event) => {
        setIsVegan(event.target.checked == true ? 1 : 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const menuItemData = {
            user: user,
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            cost: data.get("cost"),
            type: type,
            size: size,
            isVegan: isVegan
          };

          kitchenServices.addMenuItem(menuItemData).then((res)=>{
            setResponse({type: 0, message:"Meniu įrašas sėkmingai pridėtas"})
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setResponse({type: 1, message: resMessage })
          });
    };
      
    return (
        <Box>
            <Typography variant="h5">
               Naujo meniu įrašo kūrimas
            </Typography>
            <br/>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            onChange={handleTypeChange}
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
                            onChange={handleSizeChange}
                        >
                            <MenuItem value={1}>Didelė</MenuItem>
                            <MenuItem value={2}>Maža</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={isVegan == 1 ? true : false} onChange={handleIsVeganChange}/>} label="Ar veganiškas" />
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
            <Typography variant="p" color={response.type==0 ? "green" : "red"}>
                {response.message}
            </Typography>
        </Box>
    )
}

export default AddMenuItem
