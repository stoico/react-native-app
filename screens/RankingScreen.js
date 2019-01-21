import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DataSource
} from "react-native";
import { Font, AppLoading } from "expo";

import Header from "../components/Header/Header";
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
    const data = [
      { name: "You", timesRecommended: 7 },
      { name: "You", timesRecommended: 5 },
      { name: "You", timesRecommended: 3 },
      { name: "You", timesRecommended: 2 },
      { name: "You", timesRecommended: 1 }
    ];

    const itemsList = data.map((item, i) => {
      i = i + 1;
      return (
        <RankingSuggestionBox
          key={item.name + i.toString()} // each item must have a unique key prop
          numberOfRecommendations={item.timesRecommended}
          filmTitle={item.name}
          podiumPlace={i}
          navigation={this.props.navigation}
        />
      );
    });

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Ranking" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              {itemsList}
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
