import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar
} from "react-native";
import { database } from "../config/Firebase";
import { LinearGradient, Font, AppLoading } from "expo";

import Header from "../components/Header/Header";
import FeedSuggestionBox from "../components/FeedSuggestionBox";
import SuggestionButton from "../components/SuggestionButton";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, textFromFirebase: "" };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
  };

  componentWillMount() {
    // database.ref("/recommendation").push({ name: "Game of Thrones" });
  }

  renderFirebaseShit() {
    const that = this;

    database
      .ref("/recommendation/-LXFT605loY4oxiR6QxG/name")
      .once("value")
      .then(function(snapshot) {
        const didReadFromDatabase = snapshot.val();
        that.setState({ textFromFirebase: didReadFromDatabase });
      });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Consigliati" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              {/* <Button
                title="Go to Details"
                onPress={() =>
                  this.props.navigation.navigate("Film", {
                    filmID: Math.floor(Math.random() * 100)
                  })
                }
              /> */}
              <FeedSuggestionBox
                name="Stefano"
                filmTitle={this.state.textFromFirebase}
                navigation={this.props.navigation}
              />
              <FeedSuggestionBox
                name="Carmine"
                filmTitle="Game Of Thrones"
                {...this.props}
              />
              <FeedSuggestionBox
                name="Martina"
                filmTitle="Black Mirrors"
                {...this.props}
              />
              <FeedSuggestionBox
                name="Rocco"
                filmTitle="Westworld"
                {...this.props}
              />
              <FeedSuggestionBox name="Angelo" {...this.props} />
              <FeedSuggestionBox name="Marco" {...this.props} />
              <FeedSuggestionBox name="Raffaella" {...this.props} />
              <View style={styles.bottomSpacing} />
            </View>
          </ScrollView>
          <View style={styles.floatingPositionForButton}>
            <LinearGradient
              style={styles.gradientBehindButton}
              colors={greyGradient}
            >
              <SuggestionButton navigation={this.props.navigation} />
            </LinearGradient>
          </View>
        </View>
      );
    }
  }
}

const greyGradient = ["rgba(224, 224, 224, 0)", "#E0E0E0"];
const temporaryGradient = ["black", "blue"]; // Used for testing as more visible

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
