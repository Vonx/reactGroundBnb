import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates} from "../../helpers";
import * as moment from 'moment';

export class Booking extends React.Component {
    constructor(){
        super();

      this.bookingTimes = [];
      this.dateRef = React.createRef();

      this.state = {
          startAt: '',
          endAt: '',
          guests: 0
      };

      this.checkInvalidDates = this.checkInvalidDates.bind(this);
      this.handleDateClick = this.handleDateClick.bind(this);
      this.selectGuests = this.selectGuests.bind(this);
    }

    componentWillMount() {

        this.getBookedDates();
    }


    getBookedDates(){
        const bookings = this.props.rental.bookings;
        if(bookings && bookings.length > 0){

            bookings.forEach((booking)=>{

               const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/M/D');
               this.bookingTimes.push(...dateRange);
               console.log(this.bookingTimes);

            })
        }

    }

    checkInvalidDates(date) {
        return this.bookingTimes.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0
    }

    handleDateClick(event, picker){

        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');

        this.dateRef.current.value = startAt + ' to ' + endAt;

        this.setState({startAt: startAt, endAt: endAt, });
        console.log(this.state);

    }

    selectGuests(event){
        this.setState({guests: parseInt(event.target.value)});

    }

    reserveBooking(startDate, endDate){

            console.log('yay' + startDate, endDate);
    }

    render() {
        const {rental} = this.props;
        return (

            <div className='booking'>
                <h3 className='booking-price'>&#36;{rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                <div className='form-group'>
                    <label htmlFor='dates'>Dates</label>
                    <DateRangePicker onEvent={this.handleDateClick} opens='left' containerStyles={{display: 'blog'}} isInvalidDate={this.checkInvalidDates}>
                        <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                    </DateRangePicker>
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input onChange={this.selectGuests} type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
                </div>
                <button onClick={() => {this.reserveBooking(this.state.startAt, this.state.endAt)}} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
            </div>
        )
    }
}