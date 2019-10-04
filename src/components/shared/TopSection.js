import Media from "react-media";
import {goToAnchor} from "react-scrollable-anchor";
import {AnimHeader} from "./AnimHeader";
import {SearchCard} from "./SearchCard";
import React from "react";

export class TopSection extends React.Component{


    render(){
        const {displayTopNav} = this.props;
        return (
            <Media query="(min-width: 930px)">
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
                                <div className="downImageContainer clickable" onClick={()=>{goToAnchor('section2');}}>
                                    <img className="downArrowImage clickable" src={process.env.PUBLIC_URL + '/image/downArrow.png'} alt=""/>
                                </div>
                                <img className="topImage" src={process.env.PUBLIC_URL + '/image/waterImage.jpg'} alt=""/>
                            </div>
                            <SearchCard/>
                        </div>
                    ) : (
                        <Media query="(min-width: 576px)">
                            {matches =>
                                matches ? (
                                    <AnimHeader displaySearch={false} size="navbar-expand-sm" img={true}/>
                                ) : (
                                    <AnimHeader displaySearch={false} color={true} size="navbar-expand-sm" img={true}/>
                                )
                            }
                        </Media>
                    )
                }
            </Media>
        )
    }
}