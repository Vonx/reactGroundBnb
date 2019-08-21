import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { ToastContainer, toast } from 'react-toastify';
import {getRangeOfDates} from "../../helpers";
import * as moment from 'moment';
import * as actions from 'actions';
import {BookingModal} from "./BookingModal";

export class Booking extends React.Component {
    constructor(){
        super();

      this.bookingTimes = [];
      this.dateRef = React.createRef();

      this.state = {
          proposedBooking: {
              startAt: '',
              endAt: '',
              guests: ''
          },
          modal: {
              open: false
          },
          error: []

      };

      this.checkInvalidDates = this.checkInvalidDates.bind(this);
      this.handleDateClick = this.handleDateClick.bind(this);
      this.selectGuests = this.selectGuests.bind(this);
      this.cancelBooking = this.cancelBooking.bind(this);
      this.reserveBooking = this.reserveBooking.bind(this);
        this.reserveRental = this.reserveRental.bind(this);
    }

    componentWillMount() {

        this.getBookedDates();
    }


    getBookedDates(){
        const bookings = this.props.rental.bookings;
        if(bookings && bookings.length > 0){

            bookings.forEach((booking)=>{

               const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
               this.bookingTimes.push(...dateRange);

            })
        }

    }

    checkInvalidDates(date) {
        return this.bookingTimes.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleDateClick(event, picker){

        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');

        this.dateRef.current.value = startAt + ' to ' + endAt;

        this.setState({proposedBooking:{
                ...this.state.proposedBooking,
                startAt: startAt, endAt: endAt
            }
        });

    }

    selectGuests(event){
        this.setState({proposedBooking:{
                ...this.state.proposedBooking,
            guests: parseInt(event.target.value)
            }
        });

    }

    cancelBooking(){

        this.setState({modal: {
            open: false
            }
        });

    }

    addNewBookedOutDates(booking){
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
        this.bookingTimes.push(...dateRange);

    }

    reserveBooking(){
            const {startAt, endAt} = this.state.proposedBooking;

            const days = getRangeOfDates(startAt, endAt, 'Y/MM/DD').length - 1;
            const {rental} = this.props;

            this.setState({
                proposedBooking: {
                    ...this.state.proposedBooking,
                    days,
                    price: rental.dailyRate * days,
                    rental
                },
                modal: {
                    open: true
                }
            });

    }

    reserveRental() {
        actions.createBooking(this.state.proposedBooking).then((booking) => {


              console.log('reserve rental booking called');
              this.addNewBookedOutDates(booking);
              this.cancelBooking();
              this.resetForm();
              toast.success('Booking has been successfully created!');

        }, (err) => {
            console.log('err');
            this.setState({error: err});
        });
    }

    resetForm() {
        this.dateRef.current.value = '';

        this.setState({proposedBooking: {guests: ''}})


    }


    render() {
        const {rental} = this.props;
        const {startAt, endAt, guests} = this.state.proposedBooking;
        return (

            <div>
                <ToastContainer />
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
                    <input onChange={(event) => {this.selectGuests(event)}} value={guests} type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
                </div>
                <button disabled={!startAt || !endAt || !guests} onClick={() => {this.reserveBooking()}} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
                <BookingModal errors={this.state.error} open={this.state.modal.open} closeModal={this.cancelBooking} booking={this.state.proposedBooking}
                confirmModal={this.reserveRental} rentalPrice={this.props.rental.dailyRate}/>
            </div>
        )
    }
}