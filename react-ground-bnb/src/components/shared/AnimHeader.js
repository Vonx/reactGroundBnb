import React from 'react';
import {MDBAnimation} from "mdbreact";
import Header from "./Header";

export class AnimHeader extends React.Component {

    render() {
        const {positioning, displaySearch, size, displayAuth} = this.props;
        let pos = '', shwSearch = true, dspAuth = true, theSize="navbar-expand-md", theImg = true;

        if(positioning !== undefined){pos = positioning; }
        if(displaySearch !== undefined) {shwSearch = displaySearch;}
        if(size !== undefined) {theSize=size;}
        if(displayAuth !== undefined) {dspAuth = displayAuth}

        return (
            <MDBAnimation type="fadeInDown" className="theAni">
                <Header positioning={pos} showSearch={shwSearch} displayAuth={dspAuth} navType={'navbarBwm'} size={theSize} img={theImg}/>
            </MDBAnimation>
        )
    }
}