import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchInput from "./SearchInput";
import weatherImg from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

class App extends Component {
  state = {
    loading: false,
    err: false,
  };

  handleChange = async (inputText) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const cid = await fetchLocationId(inputText);
          const { location: city, temperature, weather } = await fetchWeather(
            cid
          );
          this.setState({
            loading: true,
            cityId: cid,
            error: false,
          });
          setTimeout(() => {
            this.setState({
              loading: false,
              city,
              temp: Math.round(temperature) + "º C",
              weather,
            });
          }, 5e2);
        } catch (e) {
          this.setState({
            loading: false,
            error: "location not found",
          });
        }
      }
    );
  };

  render() {
    const { cityId, city, temp, weather, loading, error } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar style="dark" />
        <ImageBackground
          source={weatherImg(weather ? weather : "Clear")}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" siz="large" />
            {loading && !error && (
              <Text style={[styles.textSm, styles.textStyle]}>
                Loading city {cityId}
              </Text>
            )}
            {error && (
              <Text style={[styles.textSm, styles.textStyle]}>
                Error: {error}
              </Text>
            )}
            {!loading && !error && (
              <>
                {city && (
                  <>
                    <Text style={[styles.textLg, styles.textStyle]}>
                      {city}
                    </Text>
                    <Text style={[styles.textReg, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.textSm, styles.textStyle]}>
                      {temp}
                    </Text>
                  </>
                )}
                {!city && (
                  <Text style={[styles.textLg, styles.textStyle]}>
                    Weather report
                  </Text>
                )}
              </>
            )}
            <SearchInput onEdit={this.handleChange} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "#ffe",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  textSm: { fontSize: 18 },
  textReg: { fontSize: 24 },
  textLg: { fontSize: 44 },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});
