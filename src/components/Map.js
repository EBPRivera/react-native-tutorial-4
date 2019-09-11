import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
// MapView
//  initialRegion Prop: where to show in the map
//  latitude and longitude: where the map would center on
//  latitudeDelta and longitudeDelta: kinda like a zoom level
//  region Prop: will jump where to the location indicated every update
// Polyline
//  draws a line in the map
// Circle
//  draws a circle in the map

import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);

  if(!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }

  return (
    <MapView
      style={ styles.mapStyle }
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline
        coordinates={locations.map(loc => loc.coords)}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    height: 300
  }
});

export default Map;
