import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

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

  render() {
    const filmTitle = this.props.filmTitle || "The Titled Film";
    // const randomNumber = Math.floor(Math.random() * 3);
    // const coverPath = "../assets/cover2.png";

    // const path = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.filmSuggestedBox}>
          <Image source={require("../assets/cover2.png")} />
          <Text style={styles.filmTitle}>{filmTitle}</Text>
          <Ionicons
            style={styles.iconMore}
            name="ios-more"
            size={20}
            color="rgba(50, 50, 50, 0.4)"
          />
        </View>
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
    backgroundColor: "#8CD2FD"
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
