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
        <View
          style={[
            styles.filmSuggestedBox,
            this.props.lastChild ? styles.lastChild : null
          ]}
        >
          <Image
            source={require("../assets/search-result-cover.png")}
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
    height: 63,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E3E3E3",
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
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
  lastChild: {
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14
  }
});
