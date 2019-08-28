import React from 'react';
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";
import {goToAnchor} from 'react-scrollable-anchor';

export function SearchCard() {
    return (
        <div className='searchCard col-md-4 position-absolute'>
            <div className='card cardWide searchbody'>
                <div className="searchTitle">
                    Book unique places to stay and things to do.
                </div>
                <div className='card-block'>
                    <br />
                    <p>See what's available across the world</p>
                    <button className='btn btn-outline-primary my-2 my-sm-0 btn-bwm-search' onClick={()=>{goToAnchor('section2')}}>Explore</button>
                </div>
                <div className='card-block'>
                    <br />
                    <p>Book unique homes and experiences</p>
                    <RentalSearchInput />
                </div>

            </div>
        </div>
    )
}