import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import authService from '../services/auth.service';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
const theme = createTheme();

export default function SignIn() {
  const history = useHistory()
  const [error,setError] =  useState("")

  useEffect(() => {
      const user = authService.getCurrentUser()
      if (!user)
      {return}
      switch(user.role) {
        case 1:
          history.push('/administracija/')
          break;
        case 2:
          history.push('/klientas/')
          break;
        case 3:
          history.push('/registratura/')
          break;
        case 4:
          history.push('/virtuve/')
          break;
        default:
          history.push('/')
      }
  },[])

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    authService.login(data.get('email'), data.get('password')).then(
    () => {
      const user = authService.getCurrentUser()
      switch(user.role) {
        case 1:
          history.push('/administracija/')
          break;
        case 2:
          history.push('/klientas/')
          break;
        case 3:
          history.push('/registratura/')
          break;
        case 4:
          history.push('/virtuve/')
          break;
        default:
          history.push('/')
      }
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setError("Neteisingas el. paštas arba slaptažodis")
    }
  );
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prisijungimas
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          <Typography component="p" color="red">
            {error}
          </Typography>   
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prisijungti
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Registracija"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}