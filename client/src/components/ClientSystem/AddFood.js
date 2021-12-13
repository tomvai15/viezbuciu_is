import * as React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import clientServices from "../../services/client.services";
import { useEffect } from "react";
import { format } from "date-fns";
import authService from "../../services/auth.service";
import AddReservation from "./AddReservation";
function createData(date, item, amount, type, price) {
  return { date, item, amount, type, price };
}
function createItems(id, name) {
  return { id, name };
}

export default function AddFood() {
  const history = useHistory();
  const { id } = useParams();
  const [items, setItems] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [orderMaxDate, setOrderMaxDate] = React.useState("2000-04-04");
  const [date, setDate] = React.useState(null);
  const [item, setItem] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [foodOrders, setFoodOrders] = React.useState([]);
  const [response, setResponse] = React.useState({ type: 0, message: "" });
  useEffect(() => {
    clientServices.getFoodOrders(id).then(
      (res) => {
        const foodOrders = res.data.data;
        setFoodOrders(
          foodOrders.map((foodOrder) =>
            createData(
              foodOrder.pristatymo_data,
              foodOrder.pavadinimas,
              foodOrder.kiekis,
              foodOrder.name,
              foodOrder.kaina
            )
          )
        );
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
  });
  useEffect(() => {
    clientServices.getFoodOrderDates(id).then(
      (res) => {
        const dates = res.data.data;
        console.log(dates);
        if (dates[0] == undefined) {
          setOpenAdd(true);
        } else {
          setOrderMaxDate(dates[0].pabaiga);
        }
      },
      (error) => {
        setOpenAdd(true);
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
  useEffect(() => {
    clientServices.getMeniuItems().then(
      (res) => {
        const items = res.data.data;
        setItems(
          items.map((item) =>
            createItems(item.id_Meniu_irasas, item.pavadinimas)
          )
        );
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
  useEffect(() => {
    clientServices.getFoodOrderTypes().then(
      (res) => {
        const types = res.data.data;
        setTypes(
          types.map((type) => createItems(type.id_Pristatymo_tipas, type.name))
        );
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

  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (
      date == null ||
      data.get("item") == null ||
      data.get("amount") == null ||
      data.get("type") == null
    ) {
      setResponse({
        type: 1,
        message:
          "Visi laukai yra privalomi. Kiekis turi būti teigiamas skaičius",
      });
    } else {
      const foodOrderData = {
        date: format(new Date(date), "yyyy-MM-dd"),
        item: data.get("item"),
        amount: data.get("amount"),
        type: data.get("type"),
        reservation: id,
      };
      clientServices.addFoodOrder(foodOrderData).then(
        (res) => {
          setResponse({
            type: 0,
            message: "Užsakymo informacija išsaugota",
          });
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
    }
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  if (openAdd) {
    return <AddReservation />;
  }
  return (
    <Box>
      <Typography variant="h5">Maisto užsakymas</Typography>
      <br />
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pristatymo data</TableCell>
                <TableCell>Patiekalas</TableCell>
                <TableCell>Kiekis</TableCell>
                <TableCell>Pristatymo tipas</TableCell>
                <TableCell>Kaina</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodOrders.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {format(new Date(row.date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography variant="h5">Naujas užsakymas</Typography>
        <br />
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns} required>
                <DatePicker
                  name="date"
                  id="date"
                  label="Data"
                  openTo="day"
                  views={["year", "month", "day"]}
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  minDate={new Date()}
                  maxDate={Date.parse(orderMaxDate.substring(0, 10))}
                  required
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
                <InputLabel id="item">Patiekalas</InputLabel>
                <Select
                  labelId="item"
                  id="item"
                  name="item"
                  onChange={(newValue) => {
                    setItem(newValue);
                  }}
                  required
                  label="Patieklas"
                >
                  {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                sx={{ width: 260 }}
                type="number"
                name="amount"
                id="amount"
                label="Kiekis"
                defaultValue={1}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(newValue) => {
                  setAmount(newValue);
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ m: 1, width: 260, margin: 0 }}>
                <InputLabel id="type">Pristatymo būdas</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  onChange={(newValue) => {
                    setType(newValue);
                  }}
                  required
                  name="type"
                  label="Pristatymo būdas"
                >
                  {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Typography variant="p" color={response.type == 0 ? "green" : "red"}>
            {response.message}
          </Typography>
          <br />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sukurti
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
