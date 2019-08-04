import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../../actions";
import authService from "../../services/auth-service";
import RentalSearchInput from "../rental/RentalSearchInput";


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

        if(isAuth){

            return <div className='navbar-nav ml-auto clickable'>
                <Link className='nav-item nav-link' to="/rentals">Welcome, {authService.getUserName()}</Link>
                <div className="nav-item dropdown">
                    <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Owner Section
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
                        <Link className="dropdown-item" to="#">Manage Rentals</Link>
                        <Link className="dropdown-item" to="#">Manage Bookings</Link>
                    </div>
                </div>
                <a className='nav-item nav-link clickable' onClick={()=>{this.logoutUser()}}>Logout</a>
            </div>

        }
        return (
            <React.Fragment>
                <Link className='nav-item nav-link active' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                <Link className='nav-item nav-link' to='/register'>Register</Link>
            </React.Fragment>
        )
    }
    render() {

        return (
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
                    <RentalSearchInput/>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>
                            {this.renderAuthButtons()}
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