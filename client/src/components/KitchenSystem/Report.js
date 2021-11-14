import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

  const data = [
    {
      name: "Kepta duona",
      count: 50
    },
    {
      name: "Kepsnys",
      count: 100
    },
    {
      name: "Cola",
      count: 120
    },
  ];

const Report = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      };

    return (
        <Box>
            <Typography variant="h5">
               Užsakymų ataskaita
            </Typography>
            <br/>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                label="Darbo diena"
                                openTo="day"
                                views={["year", "month", "day"]}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <ResponsiveContainer height={400} width='100%'>
                            <BarChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#1976d2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, }}
                    >
                Atnaujinti
                </Button>
          </Box>
        </Box>
    )
}

export default Report
