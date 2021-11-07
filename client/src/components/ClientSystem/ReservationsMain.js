import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Bed from '@mui/icons-material/Bed';
import TopMenu from '../TopMenu.js';
import { Route,useHistory} from 'react-router-dom';
import Reservations from './Reservations';
import AddReservation from './AddReservation.js';
import EditReservation from './EditReservation.js';

const drawerWidth = 200;
const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}

export default function ReservationsMain() {

  const history = useHistory();
  

  function handleClick() {
    history.push("/home");
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <TopMenu/>
      </AppBar>
      <Drawer
        sx={drawerStyle}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          Viešbučių IS
        </Toolbar >
          <Divider />
            <List>
              <ListItem button key="Reyervacijos" onClick={()=>{history.push("/klientas")}}>
                <ListItemIcon>
                  <Bed/>
                </ListItemIcon>
                <ListItemText primary="Rezervacijos"/>
              </ListItem>
            </List>
      </Drawer>
      <Box component="main"
           sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Route
            exact path="/klientas/"
            render={props => (<Box><Typography variant="h5" >Rezervacijos</Typography><br/><Reservations/></Box>)}/>
            <Route
            path="/klientas/add/"
            render={props => (<AddReservation/>)}/> 
            <Route
            path="/klientas/edit/:id"
            render={props => (<EditReservation/>)}/>
             {/* 
              <Route
            path="/klientas/edit/:id"
            render={props => (<EditWorker/>)}/>
            <Route
            path="/klientas/addfood/:id"
            render={props => (<AddFood/>)}/> */}
      </Box>
    </Box>
  );
}