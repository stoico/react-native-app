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
      "https://api.themoviedb.org/3/trending/all/day?api_key=f521cf48d44225747ebbec6f1b76573a&language=it&region=IT&page=1";

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

  renderResponseData() {
    let boxes;

    this.state.data.results.forEach(function(value, index) {
      boxes.push(
        <NewReleasesBox
          dateReleased={value.release_date}
          filmTitle={value.title}
          navigation={this.props.navigation}
        />
      );
    });

    return boxes;
  }

  render() {
    if (!this.state.fontHasLoaded || !this.state.dataHasLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Di tendenza" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              {this.state.data.results.map(result => {
                if (result.title) {
                  return (
                    <NewReleasesBox
                      dateReleased={result.release_date}
                      filmTitle={result.title}
                      coverImage={result.poster_path}
                      id={result.id}
                      key={result.id}
                      navigation={this.props.navigation}
                    />
                  );
                } else {
                  return (
                    <NewReleasesBox
                      dateReleased={result.first_air_date}
                      filmTitle={result.name}
                      coverImage={result.poster_path}
                      id={result.id}
                      key={result.id}
                      navigation={this.props.navigation}
                    />
                  );
                }
              })}

              {/* {this.renderData()} */}

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
