import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Font, AppLoading } from "expo";
import { database } from "../config/Firebase";
import firebase from "firebase";

import { isiOS } from "../constants/Platform";
import { getLightEstimationEnabled } from "expo/build/AR";

export default class RecommendFilmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      user: null,
      isAlreadyInDatabase: false,
      recommendClicked: false
    };

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  onFilmButtonClick = () => {
    if (this.state.user) {
      this.saveRecommendation(
        this.state.user.uid,
        this.props.filmID,
        this.props.filmTitle,
        this.props.posterPath,
        this.props.mediaType
      );

      this.setState({ recommendClicked: true });
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });

    firebase
      .database()
      .ref("recommendations/" + this.state.user.uid)
      .orderByChild("showID")
      .equalTo(this.props.filmID)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("exists");
          //TO FIX. Learn about callbacks and promises
          //This is called after the below code if (isAlreadyInDatabase)
          this.setState({ isAlreadyInDatabase: true });
          console.log(this.state.isAlreadyInDatabase);
        }
      });
  }

  saveRecommendation(userID, filmID, title, posterPath, mediaType) {
    const thisDateTime = Date.now();
    console.log("mediaType: " + mediaType);

    // firebase
    //   .database()
    //   .ref("recommendations/" + userID)
    //   .orderByChild("showID")
    //   .equalTo(filmID)
    //   .once("value")
    //   .then(snapshot => {
    //     if (snapshot.exists()) {
    //       console.log("exists");
    //       //TO FIX. Learn about callbacks and promises
    //       //This is called after the below code if (isAlreadyInDatabase)
    //       this.setState({ isAlreadyInDatabase: true });
    //       console.log(this.state.isAlreadyInDatabase);
    //     }
    //   });

    console.log(this.state.isAlreadyInDatabase);
    // Need to add mediaType to the database
    if (!this.state.isAlreadyInDatabase) {
      firebase
        .database()
        .ref("recommendations/" + userID)
        .push()
        .set({
          date: thisDateTime,
          showID: filmID,
          showTitle: title,
          showPosterPath: posterPath,
          mediaType: mediaType
        });
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <React.Fragment>
          {this.state.isAlreadyInDatabase ||
          this.state.recommendClicked ? null : (
            <TouchableOpacity
              style={styles.blueSuggestionButton}
              onPress={this.onFilmButtonClick.bind(this)}
            >
              <Text style={styles.textOfBlueButton}>Consiglialo</Text>
            </TouchableOpacity>
          )}
          {!this.state.recommendClicked ? null : (
            <View style={styles.greenSuggestionButton}>
              <Text style={styles.textOfBlueButton} />
            </View>
          )}
        </React.Fragment>
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
  greenSuggestionButton: {
    flex: 1,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#8CD635",
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: "#8CD635",
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
