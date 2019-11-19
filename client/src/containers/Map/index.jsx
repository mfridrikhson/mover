import React from 'react';
import PropTypes from 'prop-types';
import MapBox, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';

import { ReactComponent as AstronautSVG } from '../../images/astronaut.svg';
import { ReactComponent as MoonRoverSVG } from '../../images/moon-rover.svg';
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
      },
      myPoint: null,
      geoWatcherId: null
    };

    this.mapRef = React.createRef();
  }

  /*trackPosition = ({ coords: { latitude: lat, longitude: lng } }) => {
    if (this.props.onPositionChange && this.props.isDriver) {
      this.props.onPositionChange({ lat, lng });
    }
    this.setState({ myPoint: { lat, lng } });
  };*/

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.departPoint && nextProps.departPoint) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        this.setState({ myPoint: { lat, lng } }, () => {
          if (this.props.isDriver) {
            const intervalId = setInterval(() => {
              let newLat, newLng, goalReached;
              const { lat, lng } = this.state.myPoint;
              const { lat: goalLat, lng: goalLng } = this.state.departPointReached
                ? this.props.deliverPoint
                : this.props.departPoint;

              if (goalLat > lat) {
                newLat = lat + 0.01;
              } else {
                newLat = lat - 0.01;
              }
              if (goalLng > lng) {
                newLng = lng + 0.01;
              } else {
                newLng = lng - 0.01;
              }

              if (Math.abs(goalLat - lat) < 0.01 && Math.abs(goalLng - lng) < 0.01) {
                goalReached = true;
              }

              this.setState({
                myPoint: {
                  lat: newLat,
                  lng: newLng,
                },
                ...(goalReached
                  ? this.state.departPointReached
                    ? { deliverPointReached: true }
                    : { departPointReached: true }
                  : {})
              }, () => {
                this.props.onPositionChange(this.state.myPoint);
                if (this.state.deliverPointReached) {
                  clearInterval(intervalId);
                }
              });
            }, 500);
          }
        });
      });
    }
  }

  /*componentDidUpdate() {
    const geoWatcherId = navigator.geolocation.watchPosition(this.trackPosition, null, { enableHighAccuracy: true });
    this.setState({ geoWatcherId });
  }*/

  componentWillUnmount() {
    if (this.state.geoWatcherId) {
      navigator.geolocation.clearWatch(this.state.geoWatcherId);
    }
  }

  onViewportChange = viewport => this.setState({ viewport });

  render() {
    const { partnerPoint, departPoint, deliverPoint, isDriver } = this.props;
    const { myPoint } = this.state;

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
        {!isDriver && partnerPoint && (
          <Marker
            latitude={partnerPoint.lat}
            longitude={partnerPoint.lng}
            captureDrag={false}
            captureClick={false}
            captureDoubleClick={false}
          >
            {isDriver ? <AstronautSVG className={styles.marker}/> : <MoonRoverSVG className={styles.marker}/>}
          </Marker>
        )}
        {myPoint && (
          <Marker
            latitude={myPoint.lat}
            longitude={myPoint.lng}
            captureDrag={false}
            captureClick={false}
            captureDoubleClick={false}
          >
            {isDriver ? <MoonRoverSVG className={styles.marker}/> : <AstronautSVG className={styles.marker}/>}
          </Marker>
        )}
        {isDriver && departPoint && (
          <Marker
            latitude={departPoint.lat}
            longitude={departPoint.lng}
            captureDrag={false}
            captureClick={false}
            captureDoubleClick={false}
          >
            <span className={styles.departDeliver}>A</span>
          </Marker>
        )}
        {isDriver && deliverPoint && (
          <Marker
            latitude={deliverPoint.lat}
            longitude={deliverPoint.lng}
            captureDrag={false}
            captureClick={false}
            captureDoubleClick={false}
          >
            <span className={styles.departDeliver}>B</span>
          </Marker>
        )}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          fitBoundsOptions={{ maxZoom: 5 }}
          onViewportChange={this.onViewportChange}
          showUserLocation={true}
          style={geolocateStyle}
        />
      </MapBox>
    );
  }
}

const pointProps = PropTypes.exact({
  lat: PropTypes.number,
  lng: PropTypes.number
});

Map.propTypes = {
  partnerPoint: pointProps,
  departPoint: pointProps,
  deliverPoint: pointProps,
  isDriver: PropTypes.bool,
  onPositionChange: PropTypes.func.isRequired
};

export default Map;
