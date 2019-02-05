import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { Font, AppLoading } from "expo";
import * as Animatable from "react-native-animatable";

import Header from "../components/Header/Header";
import SuggestedBox from "../components/SuggestedBox";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      chosenName: "",
      recommendationsDataHasLoaded: false,
      recommendations: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true, chosenName: "" });
  }

  componentWillMount() {
    this.getChosenName();
    this.getUserRecommendations();
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  getChosenName() {
    //Get the current userID
    var userId = firebase.auth().currentUser.uid;
    //Get the user data
    return firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => {
        this.setState({ chosenName: snapshot.val().name });
      });
  }

  getUserRecommendations() {
    //Get the current userID
    var userId = firebase.auth().currentUser.uid;

    database.ref("/recommendations/" + userId).on("value", snapshot => {
      this.setState({ recommendations: Object.values(snapshot.val()) });
      this.setState({ recommendationsDataHasLoaded: true });
    });
  }

  render() {
    const { navigation } = this.props;
    const filmTitle = navigation.getParam("filmTitle", "?");

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header
            pageTitle="Profilo personale"
            navigation={this.props.navigation}
          />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.profileContainer}>
                <Button onPress={this.onSignOut} title="Sign out" />
                <View style={styles.categoryNameRounded}>
                  <Text style={styles.categoryNameText}>Ho consigliato</Text>
                </View>
              </View>
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
  outmostContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    minHeight: 650
  },
  profileContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    minHeight: 148,
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  categoryNameRounded: {
    width: "auto",
    backgroundColor: "#EAEAEA",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 8
  },
  categoryNameText: {
    color: "rgba(80, 80, 80, 0.5)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 14,
    textTransform: "uppercase"
  }
});
