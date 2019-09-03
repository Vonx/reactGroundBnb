import React from 'react';
import * as actions from '../../../actions';
import {Link} from "react-router-dom";
import RentalManageCard from './RentalManageCard';

export default class RentalManage extends React.Component {

    constructor(){
        super();

        this.state = {
            userRentals: [],
            fetchErrors: [],
            deleteErrors: [],
            isFetching: false
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.setState({isFetching: true});
        actions.fetchUserRentals().then(
            (userRentals)=>{
                this.setState({userRentals, isFetching: false});
        }, (fetchErrors)=>{
            this.setState({fetchErrors, isFetching: false})

        })
    }

    handleDelete(rental) {

        const {userRentals} = this.state;
        let cameBackSuccess = false;
        actions.deleteRental(rental._id).then(
            (data) => {
                console.log('successfully deleted');
                cameBackSuccess = true;
                const newArrayState = userRentals.filter((userRental) => {

                    return userRental._id !== rental._id;
                });
                this.setState({userRentals: newArrayState});

            },
            (deleteErrors) => {
                console.log('err');
                this.setState({deleteErrors});
                cameBackSuccess = false;
            });

        return cameBackSuccess;
    }



    render(){
        const {userRentals, fetchErrors, isFetching, deleteErrors} = this.state;
        return (<div>
            {isFetching && <div className="theImageContainer"><img alt='Loading..' src={process.env.PUBLIC_URL + '/image/Infinity-1.1s-105px.gif'}/></div>}
            {fetchErrors.length > 0 && fetchErrors.map((err, index) => {
                return <p key={index}>{err.title}</p>
            })}
            <section id='userRentals'>
                <h1 className='page-title'>My Rentals</h1>
                    <div className='row'>
                        {!isFetching && userRentals.length > 0 && userRentals.map((rental, index) => {
                            return <RentalManageCard rental={rental}
                                                     index={index}
                                                     key={index}
                                                     handleDelete={()=>{this.handleDelete(rental)}}
                                                     errors={deleteErrors}
                                                     />
                        })}
                    </div>
                {userRentals.length === 0 && !isFetching && <div className='alert alert-warning'>
                You dont have any rentals currenty created. If you want to advertise your property
                please follow this link.
                <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
                </div>}
                </section>
        </div>);
    }
}