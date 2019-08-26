import React from 'react';
import { Link } from 'react-router-dom';
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";

export function SearchCard(props) {
    const {booking, index} = props;

    return (
        <div className='searchCard col-md-4 position-absolute'>
            <div className='card cardWide searchbody'>
                <div className="searchTitle">
                    Book unique places to stay and things to do.
                </div>
                <div className='card-block'>
                    <br />
                    <p>Where</p>
                    <RentalSearchInput />
                </div>
                <div>
                   idk
                </div>
            </div>
        </div>
    )
}