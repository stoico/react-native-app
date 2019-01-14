import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Image,
  StatusBar,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo";

import FeedSuggestionBox from "../components/FeedSuggestionBox";
import SuggestionButton from "../components/SuggestionButton";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Consigliati",
    headerStyle: { backgroundColor: "#2EA6FF" },
    headerTintColor: "white",
    headerTitleStyle: { fontWeight: "600" }
  };

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View
          style={{
            position: "absolute",
            top: 0,
            height: 800,
            backgroundColor: "#2EA6FF",
            zIndex: -1
          }}
        >
          <LinearGradient
            colors={blueGradient}
            style={styles.gradientBehindHeader} // locations={[0, 0.2, 1]}
            locations={[0, 0.09, 0.5, 0.6, 1]}
          >
            <Image
              source={require("../assets/header-pattern.png")}
              style={{ marginLeft: -30, marginTop: 15 }}
            />
            <Text
              style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
            >
              -
            </Text>
          </LinearGradient>
        </View>
        <ScrollView style={styles.screenContainer}>
          <View style={styles.feedContainer}>
            {/* <Button
              title="Go to Details"
              onPress={() =>
                this.props.navigation.navigate("MyProfile", {
                  filmID: Math.floor(Math.random() * 100)
                })
              }
            /> */}
            <FeedSuggestionBox name="Stefano" filmTitle="You" />
            <FeedSuggestionBox name="Carmine" filmTitle="Game Of Thrones" />
            <FeedSuggestionBox name="Martina" filmTitle="Black Mirrors" />
            <FeedSuggestionBox name="Rocco" filmTitle="Westworld" />
            <FeedSuggestionBox name="Angelo" />
            <FeedSuggestionBox name="Marco" />
            <FeedSuggestionBox name="Raffaella" />
            <View style={styles.bottomSpacing} />
          </View>
        </ScrollView>
        <View style={styles.floatingPositionForButton}>
          <LinearGradient
            style={styles.gradientBehindButton}
            colors={greyGradient}
          >
            <SuggestionButton />
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const greyGradient = ["rgba(224, 224, 224, 0)", "#E0E0E0"];
const temporaryGradient = ["black", "blue"]; // Used for testing as more visible
const blueGradient = ["#0075FF", "#2EA6FF", "#2EA6FF", "#E0E0E0", "#E0E0E0"];

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
    padding: 54,
    justifyContent: "center",
    alignContent: "center"
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  }
});
