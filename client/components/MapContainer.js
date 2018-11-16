import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import CurrentLocation from './Map'
import {thunkAllB} from '../store/business'
import {connect} from 'react-redux'

const mapStyles = {
  width: '100%',
  height: '100%'
}

const mapDispatch = dispatch => {
  return {
    fetchB: () => {
      dispatch(thunkAllB())
    }
  }
}
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  }
  componentDidMount() {
    this.props.fetchB()
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {/* <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{lat: -1.2884, lng: 36.8233}}
      > */}
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyAQOJclHXVkkIoHGpFDgRwcqoqjy9VZSzk'
}))(connect(null, mapDispatch)(MapContainer))