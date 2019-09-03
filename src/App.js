import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import { Provider }from 'react-redux';
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
import ScrollableAnchor from 'react-scrollable-anchor';
import {removeHash} from 'react-scrollable-anchor';
import {ViewportBlock} from "./components/shared/ViewportBlock";
import {AnimHeader} from "./components/shared/AnimHeader";
import {TopSection} from "./components/shared/TopSection";
import {BottomNav} from "./components/shared/BottomNav";


const store = require('./reducers').init();

class App extends Component {

    constructor() {
        super();
        this.state = {
            displayTopNav: true,
            positioning: ''
        };
        this.handleBottomNavState = this.handleBottomNavState.bind(this);
    }


    componentWillMount() {
        store.dispatch(actions.checkAuthState())
    }


    handleBottomNavState(){
        return <ViewportBlock component={AnimHeader}
                              onEnterViewport={() => {
                                  removeHash();
                                  this.setState({displayTopNav: false})
                              }}
                              onLeaveViewport={() =>
                                  this.setState({displayTopNav: true})}/>
    }

    render() {
        const {displayTopNav} = this.state;
        return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='App'>
                        <ScrollableAnchor id={'section1'}>
                           <TopSection displayTopNav={displayTopNav}/>
                        </ScrollableAnchor>

                        <a href='#section1' onClick={removeHash()}> .</a>

                        <ScrollableAnchor id={'section2'}>
                            <div>
                                <BottomNav handleNav={this.handleBottomNavState}/>
                                <div className='pageContainer'>
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
                        </ScrollableAnchor>
              </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
