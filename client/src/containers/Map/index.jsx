import React from 'react';
import { Icon } from 'semantic-ui-react';
import MapBox, { Marker } from 'react-map-gl';

class Moving extends React.Component {
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
      geoStatus: '',
      currentLocation: {
        latitude: null,
        longitude: null
      }
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({
        geoStatus: 'Geolocation is not supported by your browser'
      });
    } else {
      this.setState({
        geoStatus: 'Locating...'
      });

      navigator.geolocation.watchPosition(
        this.onSuccessfulGettingGeo,
        this.onErrorGettingGeo,
        { enableHighAccuracy: true }
      );
    }
  }

  onSuccessfulGettingGeo = position => {
    this.setState({
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  };

  onErrorGettingGeo = () => {
    this.setState({
      geoStatus: 'Unable to retrieve your location'
    });
  };

  onChangeViewPort = viewport => this.setState({ viewport });

  render() {
    const { latitude, longitude } = this.state.currentLocation;

    return latitude && longitude && (
      <MapBox
        {...this.state.viewport}
        onViewportChange={this.onChangeViewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={latitude} longitude={longitude}>
          <Icon size="big" name="target" color="red"/>
        </Marker>
      </MapBox>
    );
  }
}

export default Moving;
