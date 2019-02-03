import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Alert
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { LinearGradient, Font, AppLoading } from "expo";
import { Linking, WebBrowser } from "expo";

import Header from "../components/Header/Header";
import FeedSuggestionBox from "../components/FeedSuggestionBox";
import SuggestionButton from "../components/SuggestionButton";

const captchaUrl = `https://native-recommendation-app.firebaseapp.com/captcha-page.html?appurl=${Linking.makeUrl(
  ""
)}`;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      textFromFirebase: [],
      input: "",
      user: undefined,
      phone: "",
      confirmationResult: undefined,
      code: ""
    };

    firebase.auth().useDeviceLanguage();

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
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
    this.renderFirebaseShit();
  }

  renderFirebaseShit() {
    database
      .ref("/recommendations/2whqtiH4MNU4fMtlmtHwvjvq9ji2/")
      .once("value")
      .then(snapshot => {
        const didReadFromDatabase = Object.values(snapshot.val());
        for (let obj of didReadFromDatabase) {
          const newRecommendation = {
            filmTitle: obj.showTitle,
            filmID: obj.showID,
            filmPoster: obj.showPosterPath
          };
          this.setState({
            textFromFirebase: [
              ...this.state.textFromFirebase,
              newRecommendation
            ]
          });
        }
      });
  }

  renderFeedSuggestionBox() {
    if (this.state.textFromFirebase) {
      console.log("Trigger render");
      this.state.textFromFirebase.map(value => {
        return (
          <FeedSuggestionBox
            name="Carmine"
            filmTitle={value.name}
            filmID={value.filmID}
            filmPoster={value.filmPoster}
            mediaType="movie"
            navigation={this.props.navigation}
          />
        );
      });
    }
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
              {this.state.textFromFirebase.map(recommendation => (
                <FeedSuggestionBox
                  key={recommendation.filmID}
                  name="Carmine"
                  filmTitle={recommendation.filmTitle}
                  filmPoster={recommendation.filmPoster}
                  filmID={recommendation.filmID}
                  mediaType="movie"
                  navigation={this.props.navigation}
                />
              ))}

              <FeedSuggestionBox
                name="Stefano"
                filmTitle="Temp"
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
    height: 78,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 7,
    paddingRight: 54,
    paddingLeft: 54,
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
