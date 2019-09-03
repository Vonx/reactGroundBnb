import Media from "react-media";
import RentalSearchInput from "../rental/rental-listing/RentalSearchInput";
import React from "react";

export class BottomNav extends React.Component {

    render(){
        const {handleNav} = this.props;
    return(
        <Media query="(min-width: 1050px)">
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
}