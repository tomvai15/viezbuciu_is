import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import InfoCard from "./InfoCard";
import { useEffect } from "react";
import receptionService from "../../services/reception.services";

export default function DashboardInfo() {

  const [used, setUsed] = React.useState(0);
  const [numOfRooms, setNumOfRooms] = React.useState(0);
  const [waiting, setWaiting] = React.useState(0);
  const [departure, setDeparture] = React.useState(0);

  useEffect(() => {
    receptionService.usedRooms().then(
      (res) => {
        setUsed(res.data.count.count);
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

    receptionService.waitingRooms().then(
      (res) => {
        setWaiting(res.data.count.count);
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

    receptionService.departure().then(
      (res) => {
        setDeparture(res.data.count.count);
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

    receptionService.numOfRooms().then(
      (res) => {
        setNumOfRooms(res.data.count.count);
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

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <InfoCard text={"Užimtų kambarių"} number={used} style={{textAlign: "center", color: "red"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Laisvų kambarių"} number={numOfRooms-used} style={{textAlign: "center", color: "green"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Laukiama naujų klientų"} number={waiting} style={{textAlign: "center", color: "blue"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Turintys išsiregistuori klientai"} number={departure} style={{textAlign: "center", color: "purple"}}/>
        </Grid>
      </Grid>
    </Box>
  );
}
