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
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import ReceptionDashboard from './components/ReceptionSystem/ReceptionDashboard';
import ReservationsMain from './components/ClientSystem/ReservationsMain';
import KitchenDashboard from './components/KitchenSystem/KitchenDashboard';

function App() {

  return (
    <Router>
     <Switch>      
          <Route exact path="/">
            <p>Home page</p>
            <Link to="/login">
                  Prisijungimas
            </Link>
            <br/>
            <Link to="/signup" >
                  Registracija
            </Link>
            <br/>
            <Link to="/administracija">
                    Administratoriaus posistemė
            </Link>
            <br/>
            <Link to="/registratura" >
                    Registratūros posistemė
            </Link>
            <br/>
            <Link to="/klientas" >
                    Kliento posistemė
            </Link>
            <br/>
            <Link to="/virtuve" >
                    Virtuvės posistemė
            </Link>
          </Route>
          <Route path="/klientas">
            <ReservationsMain/>
          </Route>
          <Route path="/virtuve">
            <Typography component="h1" variant="h5">
              <KitchenDashboard/>
            </Typography>
          </Route>
          <Route path="/administracija">
            <AdminDashboard/>
          </Route>
          <Route path="/registratura">
            <Typography component="h1" variant="h5">
              <ReceptionDashboard/>
            </Typography>
          </Route>
          <Route path="/login">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
