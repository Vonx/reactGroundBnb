import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import {RentalDetailInfo } from './RentalDetailInfo';
import {RentalMap} from "./RentalMap";
import {Booking} from "../../booking/Booking";
import authService from "../../../services/auth-service";
import {Link} from "react-router-dom";

class RentalDetail extends React.Component {

    componentWillMount() {
        const rentalId = this.props.match.params.id;


        this.props.dispatch(actions.fetchRentalById(rentalId));

    }

    render(){
        const {rental, auth: {isAuth}} = this.props;

        if(rental._id) {
            return (
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={rental.image} alt=''></img>
                            </div>
                            <div className='col-md-6'>
                            <RentalMap location={`${rental.city}, ${rental.street}`}/>
                            </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <h2 className='rental-city'>Owner: {rental.user && rental.user.username}</h2>
                               <RentalDetailInfo rental={rental} />
                            </div>
                            <div className='col-md-4'>
                                <div className='booking'>

                                    {isAuth ? <Booking rental={rental}/> : <div className="text-center">Interested in staying here? Make a booking today by logging in<br /><br />
                                        <Link className="loginButton" to='/login'>Login <span className='sr-only'>(current)</span></Link></div>}
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            );
        }
        else{
            return (
                <div>Loading..</div>
            )
        }
    }
}

function mapStateToProps(state){

    return {
        rental: state.rental.data,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(RentalDetail);