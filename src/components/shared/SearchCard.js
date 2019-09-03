import React from 'react';
import {goToAnchor} from 'react-scrollable-anchor';
import {Link} from "react-router-dom";
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";

export function SearchCard() {
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
                <div className='card-block'>
                    <br />
                    <button className='btn btn-outline-dark btnWide' onClick={()=>{goToAnchor('section2')}}>Explore</button>
                    <Link to="/rentals/new"><button className='btn btn-outline-grey btnWide' onClick={() => {setTimeout(()=>{goToAnchor('section2')}, 350)}}>Host</button></Link>

                </div>
            </div>
        </div>
    )
};