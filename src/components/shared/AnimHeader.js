import React from 'react';
import {MDBAnimation} from "mdbreact";
import Header from "./Header";

export class AnimHeader extends React.Component {

    render() {
        const {positioning, displaySearch, size, displayAuth, color} = this.props;
        let pos, shwSearch, col, theSize, dspAuth;

        positioning !== undefined ? pos = positioning : pos = '';
        displaySearch !== undefined ? shwSearch = displaySearch : shwSearch = true;
        color !== undefined ? col = 'warning-color' : col ='';
        size !== undefined ? theSize = size : theSize="navbar-expand-md";
        displayAuth !== undefined ? dspAuth = displayAuth : dspAuth = true;

        return (
            <MDBAnimation type="fadeInDown" className="theAni">
                <Header positioning={pos} showSearch={shwSearch} displayAuth={dspAuth} size={theSize} color={col}/>
            </MDBAnimation>
        )
    }
}