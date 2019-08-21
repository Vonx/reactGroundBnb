import React from 'react';
import { Link } from 'react-router-dom';
import {pretifyDate, toUpperCase} from "../../helpers";

export function BookingCard(props) {
    const {booking, index} = props;

    return (
        <div key={index} className='col-md-4'>
            <div className='card text-center'>
                <div className='card-header'>
                    {booking.rental ? booking.rental.category : "Deleted rental"}
                </div>
                <div className='card-block'>
                    {booking.rental && <div>

                        <h4 className='card-title'> {toUpperCase(booking.rental.title)} - {toUpperCase(booking.rental.city)}</h4>
                        <p className='card-text booking-desc'>{booking.rental.description}</p>
                    </div>}

                    <p className='card-text booking-days'>{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
                    <p className='card-text booking-price'><span>Price: </span> <span
                        className='booking-price-value'>${booking.rental.dailyRate * booking.days}</span></p>
                    <Link to={booking.rental ? {pathname: `/rentals/${booking.rental._id}`} : {pathname: '/rentals'}} className='btn btn-bwm'>Go to Rental</Link>
                </div>
                <div className='card-footer text-muted'>
                    Created {pretifyDate(booking.createdAt)}
                </div>
            </div>
        </div>
    )
}