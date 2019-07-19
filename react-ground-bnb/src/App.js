import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import { Provider }from 'react-redux';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import './App.css';
import {ProtectedRoute} from "./components/shared/auth/ProtectedRoute";
import * as actions from 'actions';
import {LoggedInRoute} from "./components/shared/auth/LoggedInRoute";


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
                      <Route exact path='/' render={() => {return <Redirect to='/rentals'/>}}/>
                      <Route exact path='/rentals' component={RentalListing}/>
                      <Route exact path='/login' component={Login}/>
                      <LoggedInRoute exact path='/register' component={Register}/>
                      <ProtectedRoute exact path='/rentals/:id' component={RentalDetail}/>

                  </div>
              </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
