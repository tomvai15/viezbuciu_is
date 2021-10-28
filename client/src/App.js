import logo from './logo.svg';
import './App.css';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
     <Switch>
          <Route exact path="/">
            <p>Home page</p>
          </Route>
          <Route path="/rezervacija">
            <Typography component="h1" variant="h5">
              Kliento posistemė
            </Typography>
          </Route>
          <Route path="/virtuve">
            <Typography component="h1" variant="h5">
              Virtuvės posistemė
            </Typography>
          </Route>
          <Route path="/administracija">
            <AdminDashboard/>
          </Route>
          <Route path="/registratura">
            <Typography component="h1" variant="h5">
              Registratūros posistemė
            </Typography>
          </Route>
          <Route path="/login">
            <SignIn/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
