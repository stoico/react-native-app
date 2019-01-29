import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Alert,
  TouchableOpacity
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

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      textFromFirebase: "",
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

  onPhoneChange = phone => {
    this.setState({ phone });
  };

  onPhoneComplete = async () => {
    let token = null;
    const listener = ({ url }) => {
      WebBrowser.dismissBrowser();
      const tokenEncoded = Linking.parse(url).queryParams["token"];
      if (tokenEncoded) token = decodeURIComponent(tokenEncoded);
    };
    Linking.addEventListener("url", listener);
    await WebBrowser.openBrowserAsync(captchaUrl);
    Linking.removeEventListener("url", listener);
    if (token) {
      const { phone } = this.state;
      //fake firebase.auth.ApplicationVerifier
      const captchaVerifier = {
        type: "recaptcha",
        verify: () => Promise.resolve(token)
      };
      try {
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phone, captchaVerifier);
        this.setState({ confirmationResult });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  onCodeChange = code => {
    this.setState({ code });
  };

  onSignIn = async () => {
    const { confirmationResult, code } = this.state;
    try {
      await confirmationResult.confirm(code);
    } catch (e) {
      console.warn(e);
    }
    this.reset();
  };

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  reset = () => {
    this.setState({
      phone: "",
      phoneCompleted: false,
      confirmationResult: undefined,
      code: ""
    });
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  renderSignUpBusiness() {
    if (this.state.user)
      return (
        <React.Fragment>
          <Text>You signed in</Text>
          <Button onPress={this.onSignOut} title="Sign out" />
        </React.Fragment>
      );
    if (!this.state.confirmationResult)
      return (
        <React.Fragment>
          <TextInput
            style={[
              {
                height: 63,
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                padding: 15,
                color: "rgba(80, 80, 80, 0.8)",
                width: "100%",
                fontFamily: "Gilroy Extrabold",
                backgroundColor: "#fff",
                fontSize: 20,
                borderRadius: 14,
                shadowOpacity: 1,
                shadowRadius: 8,
                shadowColor: "rgba(215,215,215, 0.5)",
                shadowOffset: { width: 0, height: 5 }
              }
            ]}
            keyboardType="phone-pad"
            placeholder="Numero di cellulare"
            value={this.state.phone}
            onChangeText={this.onPhoneChange}
          />
          <TouchableOpacity
            style={styles.blueSuggestionButton}
            onPress={this.onPhoneComplete}
          >
            <Text style={styles.textOfBlueButton}>Avanti</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
          <TextInput
            style={[
              {
                height: 63,
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                padding: 15,
                color: "rgba(80, 80, 80, 0.8)",
                width: "100%",
                fontFamily: "Gilroy Extrabold",
                backgroundColor: "#fff",
                fontSize: 20,
                borderRadius: 14,
                shadowOpacity: 1,
                shadowRadius: 8,
                shadowColor: "rgba(215,215,215, 0.5)",
                shadowOffset: { width: 0, height: 5 }
              }
            ]}
            value={this.state.code}
            onChangeText={this.onCodeChange}
            keyboardType="numeric"
            placeholder="Codice di conferma"
          />
          <TouchableOpacity
            style={styles.blueSuggestionButton}
            onPress={this.onSignIn}
          >
            <Text style={styles.textOfBlueButton}>Sign in</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Registrati" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                <Text style={styles.subHeading}>
                  Scambia consigli tra amici su serie TV e film
                </Text>

                {this.renderSignUpBusiness()}

                <View style={styles.bottomSpacing} />
              </View>
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
  outmostContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    height: 675
  },
  secondaryContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  subHeading: {
    marginTop: 55,
    marginBottom: 60,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    color: "#2EA6FF",
    fontFamily: "Gilroy Extrabold",
    fontSize: 26
  },
  blueSuggestionButton: {
    flex: 0.18,
    width: 200,
    marginTop: 18,
    alignSelf: "center",
    borderRadius: 35,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#2EA6FF",
    borderColor: "rgba(26, 141, 211, 0.30)",
    borderWidth: 1,
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: "#2EA6FF",
    shadowOffset: { width: 0, height: 4 }
  },
  textOfBlueButton: {
    fontFamily: "Gilroy Extrabold",
    justifyContent: "center",
    alignSelf: "center",
    color: "#F8F8F8",
    fontSize: 20
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
