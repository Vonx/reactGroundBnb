import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";
import {Link} from 'react-router-dom';
import {BookingCard} from "./BookingCard";


class BookingManage extends React.Component {
    componentWillMount() {

        this.props.dispatch(actions.fetchBookings());

        this.renderBookings = this.renderBookings.bind(this);
    }

    renderBookings(){
        const {bookings} = this.props;

        return bookings.data.map((booking, index) =>

            <BookingCard booking={booking} key={index} index={index}/>
        );
    }

    render(){
        const {bookings} = this.props;
        return (
            <div>

                <section id='userBookings'>
                    <h1 className='page-title'>My Bookings</h1>
                    <div className='row'>
                        {!bookings.isFetching && this.renderBookings()}
                        {bookings.isFetching && <div
                            className="theImageContainer"><img
                            alt='Loading..'
                            className="loadingImage" src={process.env.PUBLIC_URL + '/image/Infinity-1.1s-105px.gif'}/></div>}
                    </div>
                    {bookings.data.length === 0 && !bookings.isFetching && <div className='alert alert-warning'>
                        You have no bookings created. Visit the rentals page and book your place today.
                        <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals'>Available
                            Rental</Link>
                    </div>}
                </section>
            </div>
            );
    }
}

function mapStateToProps(state){

    return {
        bookings: state.bookings
    }
}

export default connect(mapStateToProps)(BookingManage);