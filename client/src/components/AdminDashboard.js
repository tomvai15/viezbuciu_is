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
const drawerWidth = 200;

export default function AdminDashboard() {

  const [state, setstate] = React.useState(1)
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
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>

             <ListItem button key="Darbuotojai" onClick={()=>{setstate(0)}}>
               <ListItemIcon>
                 <Work/>
               </ListItemIcon>
               <ListItemText primary="Darbuotojai"/>
             </ListItem>

            <ListItem button key="Ataskaita" onClick={()=>{setstate(1)}}>
              <ListItemIcon>
                <Analytics/>
              </ListItemIcon>
              <ListItemText primary="Ataskaita" />
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {state==0 ? <Workers/> : <Typography>TESTTT</Typography>}
      </Box>
    </Box>
  );
}