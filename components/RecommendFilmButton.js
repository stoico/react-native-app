import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Font, AppLoading } from "expo";
import { database } from "../config/Firebase";
import firebase from "firebase";

import { isiOS } from "../constants/Platform";

export default class RecommendFilmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, user: null };

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  openFilmSearchSection = () => {
    if (this.state.user) {
      this.saveRecommendation(
        this.state.user.uid,
        this.props.filmID,
        this.props.filmTitle,
        this.props.posterPath
      );
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  saveRecommendation(userID, filmID, title, posterPath) {
    const thisDateTime = Date.now();
    let isAlreadyInDatabase = false;

    firebase
      .database()
      .ref("recommendations/" + userID)
      .orderByChild("showID")
      .equalTo(filmID)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("exists");
          //TO FIX. Learn about callbacks and promises
          //This is called after the below code if (isAlreadyInDatabase)
          isAlreadyInDatabase = true;
          console.log(isAlreadyInDatabase);
        }
      });

    console.log(isAlreadyInDatabase);

    if (!isAlreadyInDatabase) {
      firebase
        .database()
        .ref("recommendations/" + userID)
        .push()
        .set({
          date: thisDateTime,
          showID: filmID,
          showTitle: title,
          showPosterPath: posterPath
        });
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.blueSuggestionButton}
          onPress={this.openFilmSearchSection.bind(this)}
        >
          <Text style={styles.textOfBlueButton}>Consiglialo</Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  blueSuggestionButton: {
    flex: 1,
    height: 60,
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
  iconMore: {
    position: "absolute",
    top: 17,
    left: 40
  }
});
