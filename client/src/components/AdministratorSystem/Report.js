import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReportChart from './ReportChart';
import ReportTable from './ReportTable';
import { Button, Typography } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';

import MobileDatePicker from '@mui/lab/MobileDatePicker';


function createData(id, date, income, costs) {
    const profit=(income-costs)
    return { id, date, income, costs, profit };
  }
const datastart = [
    createData(
      0,
      '2021-09-01',
      350,
      200,
    ),
    createData(
      1,
      '2021-09-02',
      100,
      300,
    ),
    createData(2, '2021-09-03', 300, 150),
    createData(
      3,
      '2021-09-04',
      500,
      400,
    ),
    createData(
      4,
      '2021-09-05',
      100,
      111,
    ),
  ];

const mdTheme = createTheme();

const Report = () => {
    const [data, setData] = React.useState(datastart);
    const [from, setFrom] = React.useState(new Date('2021-09-01'));
    const [to, setTo] = React.useState(new Date('2021-12-14'));
    const handleChangeFrom = (newValue) => {
        setFrom(newValue);
        console.log(from.toISOString().substring(0, 10))

      };
    const handleChangeTo = (newValue) => {
        setTo(newValue);
    };
    return (
            <Box>
            <Typography variant="h5">
                  Pajamų ir išlaidų ataskaita
            </Typography>
            <br/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                label="nuo"
                inputFormat="yyyy/MM/dd"
                value={from}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField {...params} />}
                />
                 <DesktopDatePicker
                label="iki"
                inputFormat="yyyy/MM/dd"
                value={to}
                onChange={handleChangeTo}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
    
            <Container  sx={{ml:-3, mt: 4, mb: 4 }}>         

                <Grid item xs={14}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ReportTable  data={data}/>
                  </Paper>
                </Grid>
                <Grid container spacing={3}>
                
                {/* Chart */}
                <Grid item mt={5} xs={14} md={8} lg={14}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 400,
                    }}
                  >
                    <ReportChart  data={data.filter((d) => d.date>from.toISOString().substring(0, 10) && d.date<to.toISOString().substring(0, 10) )}/>
                  </Paper>
                </Grid>   
              </Grid>
            </Container>
            <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon/>}
          
            >
            Atsisiųsti ataskaitos PDF
            </Button>
            </Box>
    )
}

export default Report
