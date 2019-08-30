import React from "react";
import RentalCreateForm from "./RentalCreateForm";
import * as actions from "../../../actions";
import {Redirect} from "react-router-dom";

export class RentalCreate extends React.Component {
    constructor(){
        super();
        this.state = {
            redirect: false,
            errors: []
        };

        this.rentalCategories = ['House', 'Apartment', 'Condo'];
        this.submitRental = this.submitRental.bind(this);
    }

    submitRental(rentalData){
        console.log(rentalData);
        actions.createRental(rentalData).then(
            (rental)=>{
                this.setState({redirect: true});
                },
            (errors)=>{console.log(errors);
                this.setState({errors: errors})
            });
    }


    render(){

        const {errors, redirect} = this.state;

        if(redirect){
            return <Redirect to={{pathname: '/rentals'}} />

        }
        return (
            <section id='newRental'>
                <div className='bwm-form'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1 className='page-title'>Create Rental</h1>
                            <RentalCreateForm rentalCategories={this.rentalCategories} submitRentalCb={this.submitRental} errors={errors}/>
                        </div>
                        <div className='col-md-6 ml-auto'>
                            <div className='image-container'>
                                <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                                <img src={process.env.PUBLIC_URL + '/image/create-rental.jpg'} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}