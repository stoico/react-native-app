import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Font, AppLoading } from "expo";

export default class SuggestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
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
          <Text style={styles.textOfBlueButton}>Consiglia serie TV o film</Text>
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
