import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

import { isiOS, isAndroid } from "../constants/Platform";

export default class SuggestedBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  // Determine which icon to display depending on whether the app
  // is run on an Android or iOS device
  displayDeviceIcon() {
    if (isiOS) {
      return (
        <Ionicons
          style={styles.iconMore}
          name="ios-more"
          size={20}
          color="rgba(50, 50, 50, 0.4)"
        />
      );
    } else {
      return (
        <Ionicons
          style={styles.iconMore}
          name="md-more"
          size={20}
          color="rgba(50, 50, 50, 0.4)"
        />
      );
    }
  }

  // removeRecommendationDatabase() {
  //   //Get the current userID
  //   var userId = firebase.auth().currentUser.uid;

  //   database
  //     .ref("/recommendations/" + userId)
  //     .child()
  //     .remove();
  // }

  removeRecommendationAlert(filmTitle) {
    const deleteMessageTitle = "Rimuovere " + filmTitle + "?";
    const deleteMessage = "Cancellarlo dalla tua lista dei consigliati?";

    Alert.alert(deleteMessageTitle, deleteMessage, [
      {
        text: "Annulla",
        onPress: () => console.log("NO Pressed"),
        style: "cancel"
      },
      { text: "Rimuovi", onPress: () => console.log("YES Pressed") }
    ]);
  }

  render() {
    const filmTitle = this.props.filmTitle || "";
    const filmID = this.props.filmID;

    let pathTMDB = "https://image.tmdb.org/t/p/w154" + this.props.filmPoster;
    // const randomNumber = Math.floor(Math.random() * 3);
    // const coverPath = "../assets/cover2.png";

    // const path = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.removeRecommendationAlert(filmTitle)}
        >
          <View style={styles.filmSuggestedBox}>
            <Image source={{ uri: pathTMDB }} style={styles.filmCoverImage} />
            <Text style={styles.filmTitle}>{filmTitle}</Text>
            {this.displayDeviceIcon()}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  filmSuggestedBox: {
    backgroundColor: "white",
    borderRadius: 22,
    height: 90,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14
  },
  filmCoverImage: {
    flex: 0.2,
    // width set to a percentage, height to undefined, and aspectRatio
    // allow to display an image at the right aspect ratio
    height: undefined,
    aspectRatio: 0.7,
    backgroundColor: "#2D93FB"
  },
  filmTitle: {
    flex: 0.8,
    paddingLeft: 12,
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 24
  },
  iconMore: {
    position: "absolute",
    top: 10,
    right: 20
  }
});
