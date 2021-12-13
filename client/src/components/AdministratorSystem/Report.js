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
import MyDocument from './pdfReport';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import ReactPDF from '@react-pdf/renderer';
import { useEffect } from 'react';
import { saveAs } from 'file-saver'
import adminServices from '../../services/admin.services';

function createData(id, date, income, costs) {
    const profit=(income-costs)
    return { id, date, income, costs, profit };
  }
const datastart = [
   
  ];

const mdTheme = createTheme();

const Report = () => {
    const [data, setData] = React.useState(datastart);
    const [from, setFrom] = React.useState(new Date('2021-09-01'));
    const [to, setTo] = React.useState(new Date('2021-12-30'));
    const handleChangeFrom = (newValue) => {
        setFrom(newValue);
        downloadData(newValue,to);
      };
    const handleChangeTo = (newValue) => {
        setTo(newValue);
        downloadData(from,newValue);
    };
    async function  downloadPDF () 
    {
      const { data } = await adminServices.getReportPdf(from,to)
      console.log(data)
      const blob = new Blob([data], { type: 'application/pdf' })
      saveAs(blob, "ataskaita.pdf")
    };

  function downloadData(start, end)
  {
    adminServices.getReportData(start,end).then((res)=>{
      const reportData = res.data.data;
      setData(reportData);
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
  }
  useEffect(() => {
    downloadData(from,to);
  },[])

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
                    <ReportChart  data={data}/>
                  </Paper>
                </Grid>   
              </Grid>
            </Container>
            <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon/>}
            onClick={downloadPDF}
            >
            Atsisiųsti ataskaitos PDF
            </Button>
            </Box>
    )
}

export default Report
