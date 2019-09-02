import Media from "react-media";
import ScrollableAnchor, {goToAnchor} from "react-scrollable-anchor";
import {AnimHeader} from "./AnimHeader";
import {SearchCard} from "./SearchCard";
import React from "react";

export function TopSection (props) {
    const {displayTopNav} = props;
    return (
    <Media query="(min-width: 890px)">
        {matches =>
            matches ? (
                <div>
                    <div className="topHeader">
                        <div onClick={() => {
                            goToAnchor('section2')
                        }}>
                            {displayTopNav &&
                            <AnimHeader displaySearch={false} displayAuth={false} positioning={'position-absolute'}/>}
                        </div>
                        <img className="topImage" src={process.env.PUBLIC_URL + '/image/waterImage.jpg'} alt=""/>
                    </div>
                    <SearchCard/>
                </div>
            ) : (
                <AnimHeader displaySearch={false} size="navbar-expand-sm" img={true}/>
            )
        }
    </Media>
    )
}