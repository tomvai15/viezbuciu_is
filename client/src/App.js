import logo from './logo.svg';
import './App.css';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import authService from './services/auth.service';
import ProtectedRoute from './components/ProtectedRoute.js';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdministratorSystem/AdminDashboard';
import ReceptionDashboard from './components/ReceptionSystem/ReceptionDashboard';
import ReservationsMain from './components/ClientSystem/ReservationsMain';
import KitchenDashboard from './components/KitchenSystem/KitchenDashboard';
const isAuthenticated = (JSON.parse(localStorage.getItem('user')) != null) && JSON.parse(localStorage.getItem('user')).role==1 ;
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
          <ProtectedRoute  path ="/klientas" role={2} component={ReservationsMain}/>
          <Route path="/virtuve">
            <Typography component="h1" variant="h5">
              <KitchenDashboard/>
            </Typography>
          </Route>
          <ProtectedRoute  path ="/administracija" role={1} component={AdminDashboard}/>
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
