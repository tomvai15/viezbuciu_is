import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import InfoCard from "./InfoCard";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function DashboardInfo() {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <InfoCard text={"Užimtų kambarių"} number={3} style={{textAlign: "center", color: "red"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Laisvų kambarių"} number={10} style={{textAlign: "center", color: "green"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Laukiama naujų klientų"} number={8} style={{textAlign: "center", color: "blue"}}/>
        </Grid>
        <Grid item>
          <InfoCard text={"Turintys išsiregistuori klientai"} number={0} style={{textAlign: "center", color: "purple"}}/>
        </Grid>
      </Grid>
    </Box>
  );
}
