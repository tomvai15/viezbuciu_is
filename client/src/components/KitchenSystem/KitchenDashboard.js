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
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DescriptionIcon from '@mui/icons-material/Description';
import TopMenu from '../TopMenu.js';
import { Route, useHistory} from 'react-router-dom';
import Menu from './Menu';
import AddMenuItem from './AddMenuItem';
import EditMenuItem from './EditMenuItem';
import Report from './Report';
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
              <ListItem button key="Menu" onClick={()=>{history.push("/virtuve")}}>
                <ListItemIcon>
                  <RestaurantMenuIcon/>
                </ListItemIcon>
                <ListItemText primary="Meniu"/>
              </ListItem>
              <ListItem button key="Report" onClick={()=>{history.push("/virtuve/ataskaita")}}>
                <ListItemIcon>
                  <DescriptionIcon/>
                </ListItemIcon>
                <ListItemText primary="Ataskaita"/>
              </ListItem>
            </List>
      </Drawer>
      <Box component="main"
           sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Route
            exact path="/virtuve/"
            render={props => (<Menu/>)}/>
            <Route
            path="/virtuve/prideti/"
            render={props => (<AddMenuItem/>)}/> 
            <Route
            path="/virtuve/redaguoti/:id"
            render={props => (<EditMenuItem/>)}/>             
            <Route
            path="/virtuve/ataskaita/"
            render={props => (<Report/>)}/>
      </Box>
    </Box>
  );
}