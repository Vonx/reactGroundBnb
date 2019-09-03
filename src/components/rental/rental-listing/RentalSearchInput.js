import React from 'react';
import {withRouter} from "react-router-dom";
import {goToAnchor} from 'react-scrollable-anchor';

class RentalSearchInput extends React.Component {

    constructor(){
        super();

        this.searchInput = React.createRef();
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.handleSearch();
        }
    }

    handleSearch(){
        const {history} = this.props;
        const city = this.searchInput.current.value;

        if(city) {
            history.push(`/rentals/${city}/homes`);
            goToAnchor('section2');
        }
        else{
            history.push(`/rentals`);
        }
    }

    render(){

        return (
            <div className='form-inline my-1 my-md-0'>
                <input onKeyPress={(event)=>{this.handleKeyPress(event)}}
                    ref={this.searchInput}
                       className='form-control bwm-search'
                       type='search'
                       placeholder='Try New York'
                       aria-label='Search'></input>
                <button onClick={()=>{this.handleSearch()}} className='btn btn-outline-dark-green my-2 my-sm-0 searchButton' type='submit'>Search</button>
            </div>
        );
    }
}

export default withRouter(RentalSearchInput);