import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { usuarioAutenticado } from "./services/auth";
import Login from "./pages/Login";
import JobView from "./pages/JobsView";
import JobRegister from "./pages/JobsRegister";
import Exit from "./pages/Exit";
import StudentLogin from "./pages/StudentsLogin";
import StudentProfile from "./pages/StudentProfile";
import StudentExit from "./pages/StudentExit";
import StudentsView from "./pages/StudentsView";


const PrivateRoute = ({ component : Component }) => (
    <Route
        render={props => 
            usuarioAutenticado() ?
                (<Component {...props} />) :
                (<Redirect to={"/login"} />)
            }
        />   
)

const PrivateRouteStudents = ({ component : Component }) => (
    <Route
        render={props => 
            usuarioAutenticado() ?
                (<Component {...props} />) :
                (<Redirect to={"/studentlogin"} />)
            }
        />   
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={StudentLogin} exact path="/studentlogin" />
            <Route component={Login} exact path="/login" />
            <Route component={StudentLogin} exact path="/studentlogin" />
            <PrivateRoute component={JobView} exact path="/jobview" />
            <PrivateRoute component={JobRegister} exact path="/jobregister" />
            <PrivateRouteStudents component={StudentProfile} exact path="/studentprofile" />
            <PrivateRouteStudents component={StudentsView} exact path="/studentsview" />
            <Route component={Exit} exact path="/exit" />
            <Route component={StudentExit} exact path="/studentexit" />
        </Switch>
    </BrowserRouter>
)

export default Routes;