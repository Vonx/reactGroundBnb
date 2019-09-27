import React from 'react';
import { Link } from 'react-router-dom';
import {rentalType} from "../../../helpers/index";

export function RentalCard(props) {
    const rental = props.rental;

    return (
        <div className={props.colNum}>
            <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
                <div className='card bwm-card'>
                    <div className='img-block'>
                        <h4 className='card-hover-text'>Click to view more</h4>
                    <img className='card-img-top' src={rental.image} alt={rental.title}></img>
                    </div>
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rental.category}`}>{rentalType(rental.shared)} {rental.category} &#183; {rental.city}</h6>
                        <h4 className='card-title'>{rental.title}</h4>
                        <p className='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}