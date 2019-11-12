import React from 'react';
import MapBox, { GeolocateControl, NavigationControl } from 'react-map-gl';

import styles from './styles.module.scss';

const mapStyleUrl = 'mapbox://styles/mapbox/streets-v11';
const geolocateStyle = {
  position: 'absolute',
  right: '1em',
  bottom: '9em'
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 50.45,
        longitude: 30.52,
        zoom: 8
      }
    };

    this.mapRef = React.createRef();
  }

  onViewportChange = viewport => this.setState({ viewport });

  render() {
    return (
      <MapBox
        {...this.state.viewport}
        ref={this.mapRef}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={mapStyleUrl}
      >
        <div className={styles.controlsContainer}>
          <NavigationControl/>
        </div>
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          fitBoundsOptions={{maxZoom: 5}}
          trackUserLocation={true}
          onViewportChange={this.onViewportChange}
          style={geolocateStyle}
        />
      </MapBox>
    );
  }
}

export default Map;
