import React from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";


function withGeocode(WrappedComponent){


  return class extends React.Component {
      constructor() {
          super();

          this.state={
              coordinates: {
                  lat: 0,
                  lng: 0
              }
          }
      }

      geoCodeLocation(){
          const location = this.props.location;
          const geocoder = new window.google.maps.Geocoder();

          geocoder.geocode({address: location}, (result, status) => {

              if (status==='OK'){
                  const geometry = result[0].geometry.location;
                  const newCoordinates = {lat: geometry.lat(), lng: geometry.lng()}

                  this.setState({
                     coordinates: newCoordinates
                  })

              }
          })
      }

      componentWillMount() {
          this.geoCodeLocation();

      }

      render(){
          return <WrappedComponent {...this.state} />
      }
  }
}

function MapComponent(props){

    const coordinates = props.coordinates;
    return (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={coordinates}
        center={coordinates}
    >
        <Marker
            position={coordinates}
        />
    </GoogleMap>
    )
}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent))
);
