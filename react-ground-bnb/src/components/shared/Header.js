import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../../actions";
import authService from "../../services/auth-service";
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";


class Header extends React.Component {

    constructor(props){
        super();
    }

    logoutUser(){
        this.props.dispatch(actions.logout());
        this.props.history.push('/login');
    }

    renderAuthButtons() {
        const {isAuth} = this.props.auth;
        const {displayAuth} = this.props;

        if(isAuth){

            return (<div><div className='navbar-nav ml-auto clickable'>
                <Link className='nav-item nav-link' to="/rentals">Welcome, {authService.getUserName()}</Link>
                {displayAuth && <div className="nav-item dropdown">
                    <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Owner Section
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
                        <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
                        <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
                    </div>
                </div>}
                <a className='nav-item nav-link clickable' onClick={()=>{this.logoutUser()}}>Logout</a>
            </div>
            </div>
            )

        }
        return (
            <React.Fragment>
                <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                <Link className='nav-item nav-link' to='/register'>Register</Link>
            </React.Fragment>
        )
    }
    render() {
        const {positioning, showSearch} = this.props;
        return (
            <nav className={`navbar navbar-dark navbar-expand-lg ${positioning} `}>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>
                        <img className="blackLogo" src={process.env.PUBLIC_URL + '/image/groundBnbLogoWhite.png'} alt=""/>
                    </Link>
                    {showSearch && <RentalSearchInput/>}
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className="navContainer">
                            <div className='navbar-nav navstyle '>
                                {this.renderAuthButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }


}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header))