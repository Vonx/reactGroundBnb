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
import {removeHash, goToAnchor, configureAnchors} from 'react-scrollable-anchor';
import {ViewportBlock} from "./components/shared/ViewportBlock";
import {AnimHeader} from "./components/shared/Fade";
import {SearchCard} from "./components/shared/SearchCard";



const store = require('./reducers').init();

class App extends Component {

    constructor() {
        super();
        this.state = {
            displayTopNav: true,
            showSearch: false,
            positioning: '',
            displayStarterImage: true
        };
    }

    componentWillMount() {
        store.dispatch(actions.checkAuthState())
    }

    componentDidMount() {
        this.setState({displayStarterImage: false});
    }


    render() {
        const {displayTopNav, displayStarterImage} = this.state;
        configureAnchors({keepLastAnchorHash: true});
        return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='App'>
                    <div>
                        {displayStarterImage && <div className="theImageContainer"><img alt='Loading..' src={process.env.PUBLIC_URL + '/image/Infinity-1.1s-105px.gif'}/></div>}
                        <ScrollableAnchor id={'section1'}>
                            <div>
                                    <div className="topHeader">
                                        <div onClick={()=>{goToAnchor('section2');
                                        }}>
                                            {displayTopNav && <AnimHeader positioning={'position-absolute'}/>}
                                        </div>
                                        <img className="topImage" src={process.env.PUBLIC_URL + '/image/waterImage.jpg'} alt=""/>
                                    </div>
                            <SearchCard/>
                            </div>
                        </ScrollableAnchor>
                        <a href='#section1' onClick={removeHash()}> .</a>
                    </div>
                        <ScrollableAnchor id={'section2'}>
                            <div>

                                <ViewportBlock component={AnimHeader} onEnterViewport={() => {removeHash(); this.setState({displayTopNav: false})}} onLeaveViewport={() => this.setState({displayTopNav: true})} />
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
