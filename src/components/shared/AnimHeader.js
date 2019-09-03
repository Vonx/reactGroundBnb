import React from 'react';
import {MDBAnimation} from "mdbreact";
import Header from "./Header";

export class AnimHeader extends React.Component {

    render() {
        const {positioning, displaySearch, size, displayAuth, color} = this.props;
        let pos = '', shwSearch = true, dspAuth = true, theSize="navbar-expand-md", col;

        if(positioning !== undefined){pos = positioning; }
        if(displaySearch !== undefined) {shwSearch = displaySearch;}
        color !== undefined ? col = 'warning-color' : col ='';
        if(size !== undefined) {theSize=size;}
        if(displayAuth !== undefined) {dspAuth = displayAuth}

        return (
            <MDBAnimation type="fadeInDown" className="theAni">
                <Header positioning={pos} showSearch={shwSearch} displayAuth={dspAuth} size={theSize} color={col}/>
            </MDBAnimation>
        )
    }
}