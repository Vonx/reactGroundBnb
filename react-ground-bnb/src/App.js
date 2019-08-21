import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { Provider }from 'react-redux';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearch from './components/rental/rental-listing/RentalSearch';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import RentalManage from "./components/rental/rental-listing/RentalManage";
import BookingManage from "./components/booking/BookingManage";
import './App.css';
import {ProtectedRoute} from "./components/shared/auth/ProtectedRoute";
import * as actions from 'actions';
import {LoggedInRoute} from "./components/shared/auth/LoggedInRoute";
import {RentalCreate} from "./components/rental/rental-create/RentalCreate";


const store = require('./reducers').init();

class App extends Component {

    componentWillMount() {
        store.dispatch(actions.checkAuthState())
    }


    render() {

    return (
        <Provider store={store}>
            <BrowserRouter>
              <div className='App'>
                  <Header />
                  <div className='container'>
                      <Switch>
                      <Route exact path='/' render={() => {return <Redirect to='/rentals'/>}}/>
                      <Route exact path='/rentals' component={RentalListing}/>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/rentals/:city/homes' component={RentalSearch}/>
                      <ProtectedRoute exact path='/rentals/manage' component={RentalManage}/>
                      <ProtectedRoute exact path='/bookings/manage' component={BookingManage}/>
                      <LoggedInRoute exact path='/register' component={Register}/>
                      <ProtectedRoute exact path='/rentals/new' component={RentalCreate}/>
                      <Route exact path='/rentals/:id' component={RentalDetail}/>
                      </Switch>

                  </div>
              </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
