import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading } from "expo";

export default class FeedSuggestionBox extends React.Component {
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
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.feedSuggestionBox}>
          <View style={styles.feedUserSuggests}>
            <Image
              source={require("../assets/avatar.png")}
              resizeMode="contain"
              style={styles.userAvatar}
            />
            <Text style={styles.userNameText}>{this.props.name}</Text>
            <Text style={styles.userNameSuggestsText}> consiglia</Text>
          </View>
          <View style={styles.filmSuggestedBox}>
            <Image
              source={require("../assets/cover3.png")}
              style={styles.filmCoverImage}
            />
            <Text style={styles.filmTitle}>
              {this.props.filmTitle || "The Titled Film"}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  feedSuggestionBox: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    height: 148,
    marginBottom: 10,
    padding: 10,
    shadowOpacity: 1, // made up this
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  feedUserSuggests: {
    flexDirection: "row",
    height: 36,
    marginBottom: 6
  },
  userAvatar: {
    width: 36,
    height: 36,
    marginRight: 8
  },
  userNameText: {
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 20,
    height: 36,
    lineHeight: 36
  },
  userNameSuggestsText: {
    fontFamily: "Gilroy Light",
    color: "#505050",
    fontSize: 12,
    marginLeft: 5,
    marginTop: 1,
    height: 36,
    lineHeight: 36
  },
  filmSuggestedBox: {
    backgroundColor: "white",
    borderRadius: 26,
    height: 90,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
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
  }
});
