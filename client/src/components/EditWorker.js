import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router-dom';
const EditWorker = () => {
    const { id } = useParams();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log("liol");
      };
    return (
        <Box>
            <Typography variant="h5">
                Darbuotojo informacijos redagavimas
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
                  defaultValue="Petras"
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
                  defaultValue="petrutis@one.lt"
                />
              </Grid>
             

            </Grid>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
            >
              Redaguoti
            </Button>
          </Box>
        </Box>
    )
}

export default EditWorker
