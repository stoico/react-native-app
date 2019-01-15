import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading } from "expo";

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

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.filmSuggestedBox}>
          <Image
            source={require("../assets/cover3.png")}
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
  }
});
