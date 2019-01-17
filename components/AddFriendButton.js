import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

import { isAndroid, isiOS } from "../constants/Platform";

export default class SuggestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
    if (isiOS) {
      console.log("You're using an iOS device");
    }
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
        <TouchableOpacity
          style={styles.blueSuggestionButton}
          onPress={this.openFilmSearchSection.bind(this)}
        >
          <Ionicons
            style={styles.iconMore}
            name="md-person-add"
            size={24}
            color="#fff"
          />
          <Text style={styles.textOfBlueButton}>Aggiungi amico</Text>
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
