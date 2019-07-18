import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import { Provider }from 'react-redux';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import './App.css';
import * as actions from 'actions';

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
                      <Route exact path='/register' component={Register}/>
                      <Route exact path='/rentals/:id' component={RentalDetail}/>

                  </div>
              </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
