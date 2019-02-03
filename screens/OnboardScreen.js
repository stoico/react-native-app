import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { LinearGradient, Font, AppLoading } from "expo";
import { Linking, WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header/Header";

export default class OnboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      textFromFirebase: "",
      userName: "",
      isUserNameValid: false,
      user: undefined,
      phone: "",
      isPhoneValid: false,
      confirmationResult: undefined,
      code: "",
      isCodeValid: false
    };

    firebase.auth().useDeviceLanguage();

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  onPhoneChange = phone => {
    // Use the libphonenumber to format the phone number e.g. add spaces between sets of numbers
    const phoneNumberFormatted = new AsYouType().input(phone);

    this.setState({
      phone: phoneNumberFormatted
    });

    // BUG - TO FIX:
    // When 'phone' is passed to parsePhoneNumberFromString
    // instead of 'this.state.phone', the isValid function
    // is not triggered at the right point
    const phoneNumber = parsePhoneNumberFromString(this.state.phone);
    if (phoneNumber) {
      if (phoneNumber.isValid()) {
        this.setState({
          isPhoneValid: true
        });
      } else {
        this.setState({
          isPhoneValid: false
        });
      }
    }
  };

  onPhoneFocus = () => {
    this.setState({ phone: "+39" });
  };

  onNameChange = userName => {
    this.setState({ userName });

    if (userName.length > 2) {
      this.setState({ isUserNameValid: true });
    } else {
      this.setState({ isUserNameValid: false });
    }
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

    if (code.length === 6) {
      this.setState({ isCodeValid: true });
    } else {
      this.setState({ isCodeValid: false });
    }
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

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Header pageTitle="Benvenuto" navigation={this.props.navigation} />

          <ScrollView
            style={styles.screenContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                <Image
                  source={require("../assets/illustration-v8.png")}
                  style={styles.illustration}
                />
                <Text style={styles.subHeading}>
                  Su Netflix ma non sai cosa guardare?
                </Text>
                <Text style={styles.subHeading}>
                  Scopri serie TV e film consigliati dai tuoi amici
                </Text>

                <TouchableOpacity
                  style={styles.blueSuggestionButton}
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text style={styles.textOfWhiteButton}>Entra 🤗</Text>
                </TouchableOpacity>

                <View style={styles.smallCircleContainer}>
                  <View style={styles.smallCircle} />
                  <View style={[styles.smallCircle, styles.makeCircleLight]} />
                </View>
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
    backgroundColor: "#fff",
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  subHeading: {
    marginTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    color: "#2EA6FF",
    fontFamily: "Gilroy Extrabold",
    fontSize: 26
  },
  blueSuggestionButton: {
    display: "none",
    minHeight: 70,
    width: 200,
    marginTop: 18,
    alignSelf: "center",
    borderRadius: 50,
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
  textOfWhiteButton: {
    fontFamily: "Gilroy Extrabold",
    justifyContent: "center",
    alignSelf: "center",
    color: "#fff",
    fontSize: 22
  },
  smallCircleContainer: {
    marginTop: 40,
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  smallCircle: {
    borderRadius: 50,
    margin: 5,
    width: 10,
    height: 10,
    backgroundColor: "#2EA6FF"
  },
  makeCircleLight: {
    backgroundColor: "#E0E0E0"
  },
  illustration: {
    marginTop: 40,
    width: "75%",
    alignSelf: "center",
    // width set to a percentage, height to undefined, and aspectRatio
    // allow to display an image at the right aspect ratio
    height: undefined,
    aspectRatio: 1.51
  }
});
