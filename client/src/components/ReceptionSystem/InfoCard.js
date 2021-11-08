import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function InfoCard({ text, number, style }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{textAlign: "center"}}>
      <Typography variant="h2" component="div" style={style}>
          {number}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {text}
        </Typography>
       
      </CardContent>
    </Card>
  );
}
