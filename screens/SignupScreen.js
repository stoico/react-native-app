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
  LayoutAnimation,
  ActivityIndicator
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { LinearGradient, Font, AppLoading } from "expo";
import { Linking, WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import * as Animatable from "react-native-animatable";

import Header from "../components/Header/Header";

const captchaUrl = `https://native-recommendation-app.firebaseapp.com/captcha-page.html?appurl=${Linking.makeUrl(
  ""
)}`;

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      textFromFirebase: "",
      chosenName: "",
      isChosenNameValid: false,
      user: undefined,
      phone: "",
      isPhoneValid: false,
      confirmationResult: undefined,
      code: "",
      isCodeValid: false,
      codeHeading: false
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
        this.setState({ isPhoneValid: true });
      } else {
        this.setState({ isPhoneValid: false });
      }
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  onPhoneFocus = () => {
    this.setState({ phone: "+39" });
  };

  onNameChange = chosenName => {
    this.setState({ chosenName });

    if (chosenName.length > 2) {
      this.setState({ isChosenNameValid: true });
    } else {
      this.setState({ isChosenNameValid: false });
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

      this.setState({ codeHeading: true });
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
    if (this.state.user) {
      this.saveChosenName(this.state.user.uid, this.state.chosenName);
    }
    this.props.navigation.navigate("Content");
  };

  // save the user's profile into Firebase so we can list users,
  // use them in Security and Firebase Rules, and show profiles
  saveChosenName(userID, name) {
    firebase
      .database()
      .ref("users/" + userID)
      .set({
        name: name
      });
  }

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
          {/* Form Container */}
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 14,
              shadowOpacity: 1,
              shadowRadius: 8,
              shadowColor: "rgba(215,215,215, 0.5)",
              shadowOffset: {
                width: 0,
                height: 5
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 63,
                padding: 10,
                width: "100%",
                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 1
              }}
            >
              <TextInput
                style={[
                  {
                    flex: 0.8,
                    paddingLeft: 15,
                    color: "rgba(80, 80, 80, 0.8)",
                    fontFamily: "Gilroy Extrabold",
                    fontSize: 20
                  },
                  this.state.isChosenNameValid
                    ? {
                        color: "rgba(80, 80, 80, 0.8)"
                      }
                    : null
                ]}
                keyboardType="default"
                placeholder="Nome"
                value={this.state.chosenName}
                onChangeText={this.onNameChange}
              />
              <View
                style={{
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.isChosenNameValid ? (
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={24}
                    color="#8CD635"
                  />
                ) : (
                  <Ionicons name="md-contact" size={24} color="#E0E0E0" />
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 63,
                padding: 10,
                width: "100%",
                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 1
              }}
            >
              <TextInput
                style={[
                  {
                    flex: 0.8,
                    paddingLeft: 15,
                    color: "rgba(80, 80, 80, 0.8)",
                    fontFamily: "Gilroy Extrabold",
                    fontSize: 20
                  },
                  this.state.isPhoneValid
                    ? {
                        color: "rgba(80, 80, 80, 0.8)"
                      }
                    : null
                ]}
                keyboardType="phone-pad"
                placeholder="Numero di cellulare"
                value={this.state.phone}
                onChangeText={this.onPhoneChange}
                onFocus={this.onPhoneFocus}
              />
              <View
                style={{
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.isPhoneValid ? (
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={24}
                    color="#8CD635"
                  />
                ) : (
                  <Ionicons
                    name="md-phone-portrait"
                    size={24}
                    color="#E0E0E0"
                  />
                )}
              </View>
            </View>
          </View>

          <Text
            style={{
              color: "rgba(80, 80, 80, 0.4)",
              textAlign: "center",
              padding: 10,
              fontSize: 12
            }}
          >
            Riceverai un codice via SMS di verifica
          </Text>

          <Animatable.View
            animation={
              this.state.isPhoneValid && this.state.isChosenNameValid
                ? "pulse"
                : null
            }
            useNativeDriver={true}
            iterationCount={4}
            duration={800}
          >
            <TouchableOpacity
              style={styles.blueSuggestionButton}
              onPress={this.onPhoneComplete}
            >
              <Text style={styles.textOfBlueButton}>Avanti</Text>
            </TouchableOpacity>
          </Animatable.View>
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 14,
              shadowOpacity: 1,
              shadowRadius: 8,
              shadowColor: "rgba(215,215,215, 0.5)",
              shadowOffset: {
                width: 0,
                height: 5
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 63,
                padding: 10,
                width: "100%",
                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 1
              }}
            >
              <TextInput
                style={[
                  {
                    flex: 0.8,
                    paddingLeft: 15,
                    color: "rgba(80, 80, 80, 0.8)",
                    fontFamily: "Gilroy Extrabold",
                    fontSize: 20
                  },
                  this.state.isCodeValid
                    ? {
                        color: "rgba(80, 80, 80, 0.8)"
                      }
                    : null
                ]}
                value={this.state.code}
                onChangeText={this.onCodeChange}
                keyboardType="numeric"
                placeholder="Codice SMS di conferma"
              />
              <View
                style={{
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.isCodeValid ? (
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={24}
                    color="#8CD635"
                  />
                ) : (
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={24}
                    color="#E0E0E0"
                  />
                )}
              </View>
            </View>
          </View>
          <Animatable.View
            animation={this.state.isCodeValid ? "pulse" : null}
            iterationCount={4}
            duration={800}
            useNativeDriver={true}
          >
            <TouchableOpacity
              style={styles.blueSuggestionButton}
              onPress={this.onSignIn}
            >
              <Text style={styles.textOfBlueButton}>Conferma</Text>
            </TouchableOpacity>
          </Animatable.View>
        </React.Fragment>
      );
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#E0E0E0"
          }}
        >
          <Header pageTitle="Benvenuto" navigation={this.props.navigation} />

          <ScrollView
            style={styles.screenContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                {!this.state.isPhoneValid ? (
                  <Animatable.Text
                    duration={100}
                    animation={this.state.isPhoneValid ? "fadeOut" : null}
                    style={styles.subHeading}
                    useNativeDriver={true}
                  >
                    {this.state.codeHeading
                      ? "Codice di conferma che hai ricevuto via SMS"
                      : "Scambia consigli tra amici su serie TV e film"}
                  </Animatable.Text>
                ) : null}
                {this.renderSignUpBusiness()}
                <View style={{ marginTop: 30 }} />
                <Button
                  title="Go to Content"
                  onPress={() => this.props.navigation.navigate("Content")}
                />
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
    minHeight: 60,
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
  }
});
