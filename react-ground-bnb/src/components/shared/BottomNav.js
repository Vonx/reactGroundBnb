import Media from "react-media";
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";
import React from "react";

export function BottomNav (props) {
    const {handleNav} = props;
    return(
        <Media query="(min-width: 890px)">
            {matches =>
                matches ? (
                    handleNav()
                ) : (
                    <div className="searchContainer">
                        <RentalSearchInput/>
                    </div>

                )
            }
        </Media>
        )
}