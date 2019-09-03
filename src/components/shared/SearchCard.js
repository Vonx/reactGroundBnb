import React from 'react';
import {goToAnchor} from 'react-scrollable-anchor';
import {Link} from "react-router-dom";

export function SearchCard() {
    return (
        <div className='searchCard position-absolute'>
            <div className='cardWide searchbody'>
                <div className="searchTitle">
                    Book a trip. Host travelers. All on GroundBnb.
                </div>
                <div className='topSection row'>
                    <div className="topInternalSection col-md-6">
                        <p>Find places to stay and things to do</p>
                        <div onClick={()=>{goToAnchor('section2')}}>
                            <Link to='/rentals'><button className='btn-bwmTop'>Explore</button></Link>
                        </div>
                    </div>
                    <div className="topInternalSection col-md-6">
                        <p>Earn money from your extra space</p>
                        <div onClick={()=>{setTimeout(()=>{goToAnchor('section2')}, 100)}}>
                            <Link to='/rentals/new'><button className='btn-bwmTop danger-color'>Host</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};