
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
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import authService from '../services/auth.service';


const theme = createTheme();

export default function SignUp() {

  const [date, setDate] = React.useState(new Date());
  const [password, setPassword] = React.useState("");
  const [error, SetError] = React.useState("");
  const [response, setResponse] = React.useState({type:0,message:""});
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('password') != data.get('comfirmpassword'))
    {
      SetError("Slaptažodis nesutampa")
      return;
    }
    SetError("")  
    
    const signUpData = {
      name: data.get('firstName'),
      surname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      userName: data.get('username'),
      bank: data.get('bank'),
      cvv: data.get('cvv'),
      date: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
    }

    console.log(signUpData)

    authService.register(signUpData).then(
      () => {
        setResponse({type:0,message:"Naudotojas užregistruotas"})
        console.log("OK")
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage)
        setResponse({type:1,message:resMessage})
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
            Registracija
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Prisijungimo vardas"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bank"
                  label="Banko sąskaitos numeris"
                  name="bank"
                  autoComplete="bank"
                />
              </Grid>
              <Grid item xs={6}>
                 <LocalizationProvider dateAdapter={AdapterDateFns} required>
                    <DatePicker
                        id="date"
                        name="date"
                        label="Kortelės galiojimo pabaiga"
                        openTo="day"
                        views={["year", "month", "day"]}
                        value={date}
                        onChange={handleChange}
                        required
                        renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="cvv"
                  label="CVV numeris"
                  name="cvv"
                  autoComplete="cvv"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Slaptažodis"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  id="password"
                  autoComplete="new-password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.length!=0}
                  required
                  type="password"
                  fullWidth
                  name="comfirmpassword"
                  label="Patvirtinkite slaptažodį"
                  id="comfirmpassword"
                  autoComplete="new-password"
                  helperText={error}
                />
              </Grid>

            </Grid>

            <Typography component="p" color={response.type==0 ? "green" : "red"}>
            {response.message}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registruotis
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Jau turi paskyrą? Prisijunk
                </Link>
              </Grid>
            </Grid>
        
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
