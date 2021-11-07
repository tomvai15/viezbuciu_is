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
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Analytics from '@mui/icons-material/Analytics';
import TopMenu from '../TopMenu';
import { Route,useHistory} from 'react-router-dom';
import Rooms from './Rooms';
import AddRoom from './AddRoom';
import EditRoom from './EditRoom';
import DashboardInfo from './DashboardInfo';
import { Timeline, TimelineWindow } from './Timeline';
const drawerWidth = 200;
const drawerStyle = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}

export default function ReceptionDashboard() {

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
        <Toolbar style={{fontSize:"16px"}}>
          Viešbučių IS
        </Toolbar >
          <Divider />
            <List>
            <ListItem button key="Valdymo skydas" onClick={()=>{history.push("/registratura")}}>
                <ListItemIcon>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Valdymo skydas"/>
              </ListItem>
              <ListItem button key="Kambariai" onClick={()=>{history.push("/registratura/kambariai")}}>
                <ListItemIcon>
                  <MeetingRoomIcon/>
                </ListItemIcon>
                <ListItemText primary="Kambariai"/>
              </ListItem>
              <ListItem button key="Kambarių užimtumas" onClick={()=>{history.push("/registratura/uzimtumas")}}>
                <ListItemIcon>
                  <DateRangeIcon/>
                </ListItemIcon>
                <ListItemText primary="Kambarių užimtumas" />
              </ListItem>
            </List>
      </Drawer>
      <Box component="main"
           sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Route
            exact path="/registratura/"
            render={props => (<Box><Typography variant="h5" >Registratūros posistemė</Typography><DashboardInfo/></Box>)}/>
          <Route
            path="/registratura/kambariai"
            render={props => (<Box><Typography variant="h5" >Viešbučio kambariai</Typography><br/><Rooms/></Box>)}/>
          <Route
            path="/registratura/uzimtumas"
            render={props => (<Box><Typography variant="h5" >Kambarių užimtumas</Typography><br/><TimelineWindow/></Box>)}/>
             <Route
            path="/registratura/add/"
            render={props => (<AddRoom/>)}/>
              <Route
            path="/registratura/edit/:id"
            render={props => (<EditRoom/>)}/>
      </Box>
    </Box>
  );
}