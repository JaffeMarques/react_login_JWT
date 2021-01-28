import React from 'react';
import Login from './view/Login/';
import Home from './view/Home/';
import User from './view/User/';
import Register from './view/Register/';
import Recover from './view/Recover/';
import Reset from './view/Recover/newPassword';

import { 
    BrowserRouter, 
    Route, 
    Switch 
} from 'react-router-dom';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/recover" exact component={Recover} />
                <Route path="/user" exact component={User} />
                <Route path="/reset/:token" exact component={Reset} />
            </Switch>
        </BrowserRouter>
    );
}