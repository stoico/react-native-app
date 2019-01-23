import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Font, AppLoading } from "expo";

import Header from "../components/Header/Header";
import NewReleasesBox from "../components/NewReleasesBox";

export default class NewReleasesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontHasLoaded: false, dataHasLoaded: false };

    let uriAPI =
      "https://api.themoviedb.org/3/movie/550?api_key=f521cf48d44225747ebbec6f1b76573a&language=it&region=IT";

    fetch(uriAPI)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ dataHasLoaded: true, data: responseJSON });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontHasLoaded: true });
  }

  renderData() {
    return (
      <React.Fragment>
        <Text>{this.state.data.original_title}</Text>
        <Text>{this.state.data.release_date}</Text>
        <Text>{this.state.data.tagline}</Text>
      </React.Fragment>
    );
  }

  render() {
    if (!this.state.fontHasLoaded || !this.state.dataHasLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Nuove uscite" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              {this.renderData()}

              <NewReleasesBox
                dateReleased="12/07/2018"
                navigation={this.props.navigation}
              />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <View style={styles.bottomSpacing} />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  feedContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30
  },
  floatingPositionForButton: {
    flex: 1,
    position: "absolute",
    width: "100%",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    zIndex: 1
  },
  gradientBehindButton: {
    height: 85,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 7,
    paddingRight: 36,
    paddingLeft: 36,
    paddingBottom: 18
  },
  gradientBehindHeader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  }
});
