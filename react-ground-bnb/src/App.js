import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
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
import {removeHash, goToAnchor, configureAnchors} from 'react-scrollable-anchor';
import {ViewportBlock} from "./components/shared/ViewportBlock";
import {AnimHeader} from "./components/shared/AnimHeader";
import {SearchCard} from "./components/shared/SearchCard";
import Media from 'react-media';
import Header from "./components/shared/Header";
import RentalSearchInput from "./components/rental/rental-listing/RentalSearchInput";




const store = require('./reducers').init();

class App extends Component {

    constructor() {
        super();
        this.state = {
            displayTopNav: true,
            positioning: ''
        };
    }

    componentWillMount() {
        store.dispatch(actions.checkAuthState())
    }

    render() {
        const {displayTopNav} = this.state;
        configureAnchors({keepLastAnchorHash: true});
        return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='App'>
                        <ScrollableAnchor id={'section1'}>
                                <Media query="(min-width: 890px)">
                                    {matches =>
                                        matches ? (
                                            <div onClick={()=>{goToAnchor('section2')}}>
                                            <div className="topHeader">
                                                {displayTopNav && <AnimHeader displaySearch={false} displayAuth={false} positioning={'position-absolute'}/>}
                                                <img className="topImage" src={process.env.PUBLIC_URL + '/image/waterImage.jpg'} alt=""/>
                                            </div>
                                            <SearchCard/>
                                            </div>
                                        ) : (
                                            <AnimHeader displaySearch={false} size="navbar-expand-sm" img={true}/>
                                        )
                                    }
                                </Media>
                        </ScrollableAnchor>
                        <a href='#section1' onClick={removeHash()}> .</a>

                        <ScrollableAnchor id={'section2'}>
                            <div>

                                <Media query="(min-width: 890px)">
                                    {matches =>
                                        matches ? (
                                            <ViewportBlock component={AnimHeader}
                                                           onEnterViewport={() => {
                                                               removeHash();
                                                               this.setState({displayTopNav: false})}}
                                                           onLeaveViewport={() =>
                                                               this.setState({displayTopNav: true})}/>
                                        ) : (
                                            <div className="searchContainer">
                                                <RentalSearchInput />
                                            </div>

                                        )
                                    }
                                </Media>
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
