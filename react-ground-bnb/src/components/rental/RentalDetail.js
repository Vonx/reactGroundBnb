import React from 'react'
import { RentalCard } from './RentalCard';

export class RentalDetail extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        console.log(this.props);
        console.log("the id is " + this.props.match.params.id);
        debugger;
        return (
            <div>I am detail component.
            </div>
        );
    }

}