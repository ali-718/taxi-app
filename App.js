import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import MapView from "react-native-maps";
import axios from "axios";

export default class App extends React.Component {
  state = {
    region: {
      longitude: 24.859416,
      latitude: 67.009685,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    destination: "",
    predictions: []
  };

  onChangeLocation = async val => {
    this.setState({
      destination: val
    });

    let apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAGC7lHJNpuBGN4RCobhFeTkcCL_mX5_BY&input=24.855389,67.015132&radius=2000`;

    axios.get(apiUrl).then(res => {
      this.setState({
        predictions: res.data.predictions
      });
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(res => {
      this.setState({
        region: { ...res.coords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
      });
    });
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={this.state.region}
        />
        {console.log(this.state)}
        <TextInput
          placeholder="enter location"
          style={{
            marginTop: 40,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "gray",
            paddingLeft: 10
          }}
          value={this.state.destination}
          onChangeText={val => this.onChangeLocation(val)}
        />
        {this.state.predictions.map(item => (
          <Text key={item.id}>{item.description}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
