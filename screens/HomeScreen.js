import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ImageBackground
} from "react-native";
import { LinearGradient, Font, AppLoading } from "expo";

import FeedSuggestionBox from "../components/FeedSuggestionBox";
import SuggestionButton from "../components/SuggestionButton";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

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
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <View
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: 800,
              backgroundColor: "#2EA6FF",
              zIndex: -1
            }}
          >
            {/* Header container */}
            <View
              style={{
                flex: 1,
                height: 120,
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <LinearGradient
                colors={blueGradient}
                style={styles.gradientBehindHeader}
                locations={
                  [0, 0.09, 0.5, 0.6, 1] // locations={[0, 0.2, 1]}
                }
              >
                <ImageBackground
                  source={require("../assets/header-pattern.png")}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: 50,
                    marginTop: 40,
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={
                      {
                        flex: 1,
                        marginTop: 2,
                        color: "white",
                        fontFamily: "Gilroy Extrabold",
                        fontSize: 23,
                        alignSelf: "center"
                      } // marginTop: 6,
                    }
                  >
                    Consigliati
                  </Text>
                </ImageBackground>
              </LinearGradient>
            </View>
          </View>
          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              <Button
                title="Go to Details"
                onPress={() =>
                  this.props.navigation.navigate("Suggest", {
                    filmID: Math.floor(Math.random() * 100)
                  })
                }
              />
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
    justifyContent: "center",
    alignContent: "center"
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  }
});
