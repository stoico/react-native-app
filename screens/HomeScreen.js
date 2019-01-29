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

const captchaUrl = `https://my-firebase-hosting/captcha-page.html?appurl=${Linking.makeUrl(
  ""
)}`;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, textFromFirebase: "", input: "" };

    firebase.auth().useDeviceLanguage();
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
    const that = this;

    database
      .ref("/recommendation/")
      .once("value")
      .then(function(snapshot) {
        const didReadFromDatabase = Object.values(snapshot.val());
        for (let obj of didReadFromDatabase) {
          console.log(obj.name);
        }
        that.setState({ textFromFirebase: didReadFromDatabase[0].name });
      });
  }

  signUp() {
    let phoneNumber = this.state.input;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function(confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        Alert.alert(confirmationResult);
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
      })
      .catch(function(error) {
        // Error; SMS not sent
        // ...
        console.log(error);
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
              <TextInput
                style={{
                  height: 50,
                  padding: 15,
                  backgroundColor: "white",
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 8
                }}
                placeholder="Phone number"
                onChangeText={input => this.setState({ input })}
                value={this.state.input}
              />
              <Button
                onPress={this.signUp}
                title="Sign Up"
                color="#841584"
                accessibilityLabel="Sign up to the app"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  marginBottom: 20
                }}
              >
                Riceverai un SMS di conferma
              </Text>
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
