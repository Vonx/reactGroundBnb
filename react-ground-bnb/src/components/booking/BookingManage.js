import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";


class BookingManage extends React.Component {
    componentWillMount() {

        this.props.dispatch(actions.fetchBookings());

        this.renderBookings = this.renderBookings.bind(this);
    }

    renderBookings(){
        const {bookings} = this.props;

        return bookings.data.map((booking, index) =>
            <p key={index}>{booking.startAt} - {booking.endAt}</p>
        );
    }

    render(){
        return (
            <div>
                {this.renderBookings()}
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