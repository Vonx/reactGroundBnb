import React from 'react';
import { Link } from 'react-router-dom';
import {pretifyDate, toUpperCase} from "../../../helpers";
import Modal from "react-responsive-modal";
import * as actions from "../../../actions";
import {DisplayError} from "../../shared/form/displayError";
import { ToastContainer, toast } from 'react-toastify';

export default class RentalManageCard extends React.Component{
    constructor() {
        super();
        this.state={
            showBookings: false,
            wantsDelete: false,
            displayErrorMessage: false

        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
    }

    openModal() {
        this.setState({showBookings: true});
    }

    deleteRental() {
        this.setState({wantsDelete: true});
    }


    closeModal() {
            this.setState({showBookings: false});
    }

    renderDelete(){
        const {rental, handleDelete} = this.props;
        return <div className="card-header"><p>Are you sure you want to delete this rental?</p>
                <button onClick={()=>{
                    if(!handleDelete(rental)){
                        this.setState({displayErrorMessage: true});
                    }
                }}
                        className="btn btn-bwm text-center">Yes</button>
                <button onClick={()=>{this.setState({wantsDelete: false})}}
                        className="btn btn-bwm text-center">No</button>
        </div>

    }

    errorMessage(errors) {

        return <div><DisplayError errors={errors}/>
            <button onClick={() => {
                this.setState({wantsDelete: false, displayErrorMessage: false})
            }}
                    className="btn btn-bwm text-center">OK
            </button>
        </div>
    }

render(){
    const {rental, index, errors} = this.props;
    const {showBookings, wantsDelete, displayErrorMessage} = this.state;

    const dynamicCardStyle = wantsDelete ? 'deleteStyling' : '';
    return (
        <div key={index} className='col-md-4'>
            <div className={`card text-center ${dynamicCardStyle}`}>
                <div className='card-block'>
                    {!wantsDelete && <div><h4 className='card-title'>{rental.title} - {rental.city}</h4>
                    <Link className='btn btn-bwm' to={{pathname: `/rentals/${rental._id}`}}>Go to Rental</Link>

                    {rental.bookings.length > 0 && <button onClick={()=>{this.openModal()}}
                            className="btn btn-bwm text-center">Bookings</button>}
                            <button onClick={()=>{this.deleteRental()}}
                                                className="btn btn-bwm text-center">Delete</button>
                    </div>}
                    {!displayErrorMessage && wantsDelete && this.renderDelete()}
                    {displayErrorMessage && errors.length > 0 && this.errorMessage(errors)}
                    <Modal open={showBookings} onClose={this.closeModal} little classNames={{ modal: 'booking-modal' }}>
                        <h4 className='modal-title title'>Bookings </h4>
                        <div className='modal-body'>
                            <ul id="bookingsContainer"className='list-group'>
                                {rental.bookings.map((booking, index)=>{

                                    return <li className="list-group-item" key={index}>
                                        Booking: {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)}
                                        <br />
                                        Guests: {booking.guests}
                                        <br />
                                        Total Price: ${booking.days * rental.dailyRate}
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Close</button>
                        </div>
                    </Modal>
                </div>


                <div className='card-footer text-muted'>
                    Created {pretifyDate(rental.createdAt)}

                </div>
            </div>
        </div>
    )
}

}