import React from 'react';
import {MDBAnimation} from "mdbreact";
import Header from "./Header";

export class AnimHeader extends React.Component {

    render() {
        const {positioning} = this.props;
        let pos, showSearch, displayAuth;
        if(positioning !== undefined){showSearch = false; pos = positioning; displayAuth = false;}
        else{showSearch = true; pos = ''; displayAuth = true;}
        return (
            <MDBAnimation type="fadeInDown" className="theAni">
                <Header positioning={pos} showSearch={showSearch} displayAuth={displayAuth}/>
            </MDBAnimation>
        )
    }
}