import React, { Component } from 'react';
import "./App.scss";
import { Login, Register } from "./login/index";
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import SideBar from './MainPage/Sidebar';
import FirstPage from './login/FirstPage';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';



class App extends Component {

  render() {
    return (

      <BrowserRouter >
        <div>
            <Switch>
             <Route exact={true} path="/home" component={MainPage} />
             <Route exact={true} path="/" component={Login}/>
             <Route exact={true} path="/register" component={Register}/>
             <Route component={NotFound}/>
           </Switch>
        </div> 
      </BrowserRouter>
     

    )
  }
}
export default withRouter(App);
