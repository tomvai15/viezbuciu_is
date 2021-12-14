
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import AdminDashboard from './AdministratorSystem/AdminDashboard';

function ProtectedRoute  ({ component: Component, role:Role, ...restOfProps  })  
{
  const isAuthenticated = (JSON.parse(localStorage.getItem('user')) != null) && JSON.parse(localStorage.getItem('user')).role==Role ;
  console.log("this", isAuthenticated);

  console.log(Component)

    return (
        <Route
          {...restOfProps}
          render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      );
}
export default  ProtectedRoute;