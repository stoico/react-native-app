import React from "react";
import { StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "../components/HeaderSection";
import RankingSuggestionBox from "../components/RankingSuggestionBox";

export default class RankingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { fontLoaded: false, podiumCounter: 0 };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  incrementItem = () => {
    this.setState({ podiumCounter: this.state.podiumCounter + 1 });
  };

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
  };

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <HeaderSection pageTitle="Ranking" />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              <RankingSuggestionBox
                numberOfRecommendations={7}
                filmTitle="You"
                podiumPlace={this.state.podiumCounter}
                navigation={this.props.navigation}
              />
              <RankingSuggestionBox
                numberOfRecommendations={4}
                filmTitle="Game Of Thrones"
                podiumPlace={this.state.podiumCounter}
                {...this.props}
              />
              <RankingSuggestionBox
                numberOfRecommendations={3}
                filmTitle="Black Mirrors"
                podiumPlace={this.state.podiumCounter}
                {...this.props}
              />
              <RankingSuggestionBox
                numberOfRecommendations={2}
                filmTitle="Westworld"
                {...this.props}
              />
              <RankingSuggestionBox
                numberOfRecommendations={1}
                {...this.props}
              />
              <RankingSuggestionBox
                numberOfRecommendations={1}
                {...this.props}
              />
              <RankingSuggestionBox
                numberOfRecommendations={1}
                {...this.props}
              />
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
