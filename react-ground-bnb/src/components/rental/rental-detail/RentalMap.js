import React from 'react';
import {MapWithGeocode} from "../../map/googleMap";
import {googleApi} from '../../../helpers/googleHelpers.js';

export class RentalMap extends React.Component {


    render() {

        const location = this.props.location;

        return (
// googleMapURL is imported and not pushed to github, needs to be provided
            <MapWithGeocode
                googleMapURL={googleApi}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}