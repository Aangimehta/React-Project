import React, { Fragment, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgetPassword from './ForgetPassword';
import Dashboard from './Dashboard';
import Error from './404';
import FormBuilder from './FormGenerator';
import { ProtectedRoute } from './ProtectedRoute';

class Main extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/' component={() => <Home />}></Route>
                    <Route exact path='/home' component={() => <Home />}></Route>
                    <Route exact path='/formbuilder' component={() => <FormBuilder />}></Route>
                    <Route exact path='/signin' component={() => <SignIn />} ></Route>
                    <Route exact path='/signup' component={() => <SignUp />} ></Route>
                    <Route exact path='/forgetpassword' component={() => <ForgetPassword />} ></Route>
                    <ProtectedRoute exact path='/dashboard' component={() => <Dashboard />} ></ProtectedRoute>
                    <Route exact path='/*' component={() => <Error />} ></Route>
                </Switch>
            </Fragment>
        );
    }
}

export default Main;