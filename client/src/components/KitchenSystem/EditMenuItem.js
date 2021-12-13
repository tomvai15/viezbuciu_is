import * as React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import kitchenServices from '../../services/kitchen.services';

function createData(id, name, description, price, cost, isVegan, type, size) {
    return {id, name, description, price, cost, isVegan, type, size};
}

const EditMenuItem = () => {
    const [menuItem, setMenuItem] = React.useState(createData(-1, "", "", 1, 1, 1, 1, 1))
    const { id } = useParams();
    const [response, setResponse] = React.useState({type: 0, message: ""})

    useEffect(() => {
        kitchenServices.getMenuItem(id).then((res)=>{
            const menuItem = res.data.data;
            setMenuItem(createData(
                id,
                menuItem.pavadinimas,
                menuItem.aprasymas,
                menuItem.kaina,
                menuItem.savikaina,
                menuItem.yra_veganiskas,
                menuItem.tipas,
                menuItem.porcijos_dydis
                )
            );
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
    
        let m = {...menuItem}

        kitchenServices.updateMenuItem(m).then((res)=>{
          setResponse({type: 0, message:"Meniu įrašo informacija išsaugota"})
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
          setResponse({type: 1, message: resMessage })
        });  
      };
      
    return (
        <Box>
            <Typography variant="h5">
               Meniu įrašo redagavimas
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
                    value={menuItem.name}
                    onChange={(event)=>setMenuItem({...menuItem,name:event.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="description"
                    label="Aprašymas"
                    name="description"
                    value={menuItem.description}
                    onChange={(event)=>setMenuItem({...menuItem,description:event.target.value})}
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
                        step: "0.01"
                    }}
                    value={menuItem.price}
                    onChange={(event)=>setMenuItem({...menuItem,price:event.target.value})}
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
                        step: "0.01"
                    }}
                    value={menuItem.cost}
                    onChange={(event)=>setMenuItem({...menuItem,cost:event.target.value})}
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
                            value={menuItem.type}
                            onChange={(event)=>setMenuItem({...menuItem,type:event.target.value})}
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
                            value={menuItem.size}
                            onChange={(event)=>setMenuItem({...menuItem,size:event.target.value})}
                        >
                            <MenuItem value={1}>Didelė</MenuItem>
                            <MenuItem value={2}>Maža</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={menuItem.isVegan == 1 ? true : false} onChange={(event)=>setMenuItem({...menuItem,isVegan:event.target.checked == true ? 1 : 0})}/>} label="Ar veganiškas" />
                    </FormGroup>
                </Grid>
            </Grid>
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

export default EditMenuItem
