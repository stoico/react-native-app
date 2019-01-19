import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

import { isiOS } from "../constants/Platform";

export default class SearchResultBox extends React.Component {
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
          <Image
            source={require("../assets/search-result-image.png")}
            style={styles.filmCoverImage}
          />
          <Text style={styles.filmTitle}>{filmTitle}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  filmSuggestedBox: {
    backgroundColor: "white",
    // borderRadius: 22,
    height: 90,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3"
  },
  filmCoverImage: {
    flex: 0.2,
    backgroundColor: "#8CD2FD",
    height: "100%"
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
