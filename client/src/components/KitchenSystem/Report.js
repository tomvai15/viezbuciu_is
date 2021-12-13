import { Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect } from 'react';
import kitchenServices from '../../services/kitchen.services';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

const Report = () => {
    const [data, setData] = React.useState([]);
    const [date, setDate] = React.useState(new Date());

    useEffect(() => {
      kitchenServices.getReport().then(
        (res) => {
          const report = res.data.data;
          setData(report);
          console.log(report);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }, []);

    const handleDateChange = (newValue) => {
      setDate(newValue);
    };

    return (
        <Box>
            <Typography variant="h5">
               Užsakymų ataskaita
            </Typography>
            <br/>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                label="Darbo diena"
                                inputFormat="yyyy/MM/dd"
                                openTo="day"
                                views={["year", "month", "day"]}
                                renderInput={(params) => <TextField {...params} />}
                                value={date}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <ResponsiveContainer height={400} width='100%'>
                            <BarChart
                                data={data.filter((d) => d.date.substring(0, 10) == date.toISOString().substring(0, 10))}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                >
                                <XAxis dataKey="name" />
                                <YAxis dataKey="count"/>
                                <Tooltip />
                                <Bar dataKey="count" fill="#1976d2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
          </Box>
        </Box>
    )
}

export default Report
