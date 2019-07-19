import React from 'react';
import {Cacher} from '../../services/cacher';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
} from "react-google-maps";


function withGeocode(WrappedComponent){


  return class extends React.Component {
      constructor() {
          super();
          this.cacher = new Cacher();

          this.state={
              coordinates: {
                  lat: 0,
                  lng: 0
              },
              isError: false,
              isLocationLoaded: false
          }
      }

      updateCoordinates(coordinates){
          this.setState({
              coordinates: coordinates,
              isLocationLoaded: true
          })
      }

      geoLocation(location){
          const geocoder = new window.google.maps.Geocoder();

          return new Promise((resolve, reject) => {

              geocoder.geocode({address: location}, (result, status) => {
                  if (status==='OK'){
                      const geometry = result[0].geometry.location;
                      const newCoordinates = {lat: geometry.lat(), lng: geometry.lng()};
                      //if status is OK, cache the location with the coordinates
                      this.cacher.cacheValue(location, newCoordinates);

                      resolve(newCoordinates);
                  }
                  else{
                      reject('ERROR');
                  }
              })
          });
      }

      getGeocodeLocation(){
          const location = this.props.location;

          // if the location has already been cached, set coordinates state to that locations coordinates
          if(this.cacher.isValueCached(location)){
              this.updateCoordinates(this.cacher.getValue(location));
          }

          else{

            this.geoLocation(location).then(
                (coordinates)=>{
                    this.updateCoordinates(coordinates);
                },
                (error)=>{
                console.log(error);
                    this.setState({
                            isError: true,
                            isLocationLoaded: true
                        }
                    )

            });
          }
      }

      componentWillMount() {
          this.getGeocodeLocation();

      }

      render(){
          return <WrappedComponent {...this.state} />
      }
  }
}

function MapComponent(props){

    //const coordinates = props.coordinates;
    const {coordinates, isError, isLocationLoaded} = props;
    return (
    <GoogleMap
        defaultZoom={14}
        defaultCenter={coordinates}
        center={coordinates}
        options={{disableDefaultUI: isError ? true : false}}
    >
        {isLocationLoaded && !isError &&
        <Circle center={coordinates} radius={500} />}
        {isLocationLoaded && isError &&
        <InfoWindow position={coordinates} options={{maxWidth: 300}}>
            <div>We couldn't find the location you specified, please check the spelling and try again
            </div>
        </InfoWindow>}
    </GoogleMap>
    )
}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent))
);
