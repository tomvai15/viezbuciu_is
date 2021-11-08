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
import Work from '@mui/icons-material/Work';
import Analytics from '@mui/icons-material/Analytics';
import TopMenu from './TopMenu';
import Workers from './Workers';
import { Route,useHistory} from 'react-router-dom';
import EditWorker from './EditWorker';
import AddWorkekr from './AddWorker';
const drawerWidth = 200;
const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}

export default function AdminDashboard() {

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
              <ListItem button key="Darbuotojai" onClick={()=>{history.push("/administracija/darbuotojai")}}>
                <ListItemIcon>
                  <Work/>
                </ListItemIcon>
                <ListItemText primary="Darbuotojai"/>
              </ListItem>
              <ListItem button key="Ataskaita" onClick={()=>{history.push("/administracija/ataskaita")}}>
                <ListItemIcon>
                  <Analytics/>
                </ListItemIcon>
                <ListItemText primary="Ataskaita" />
              </ListItem>
            </List>
      </Drawer>
      <Box component="main"
           sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Route
            exact path="/administracija/"
            render={props => (<Typography variant="h5" >Administratoriaus posistemė</Typography>)}/>
          <Route
            path="/administracija/darbuotojai"
            render={props => (<Box><Typography variant="h5" >Viešbučio darbuotojai</Typography><br/><Workers/></Box>)}/>
          <Route
            path="/administracija/ataskaita"
            render={props => (<div>ataskaita</div>)}/>
             <Route
            path="/administracija/add/"
            render={props => (<AddWorkekr/>)}/>
              <Route
            path="/administracija/edit/:id"
            render={props => (<EditWorker/>)}/>
      </Box>
    </Box>
  );
}