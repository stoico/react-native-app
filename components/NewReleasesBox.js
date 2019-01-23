import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
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
    const filmTitle = this.props.filmTitle || "The Titled Film";

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      let pathTMDB = "https://image.tmdb.org/t/p/w154" + this.props.coverImage;

      return (
        <View style={styles.feedSuggestionBox}>
          <View style={styles.feedUserSuggests}>
            <Text style={styles.dateReleasedText}>
              {this.props.dateReleased}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Film", {
                filmTitle: filmTitle
              })
            }
          >
            <View style={styles.filmSuggestedBox}>
              <Image source={{ uri: pathTMDB }} style={styles.filmCoverImage} />
              <Text style={styles.filmTitle}>{filmTitle}</Text>
            </View>
          </TouchableWithoutFeedback>
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
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  feedUserSuggests: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 36,
    marginBottom: 6,
    paddingRight: 12
  },
  dateReleasedText: {
    fontFamily: "Gilroy Extrabold",
    color: "rgba(80, 80, 80, 0.8)",
    fontSize: 14,
    height: 36,
    lineHeight: 36,
    alignSelf: "flex-end"
  },
  filmSuggestedBox: {
    backgroundColor: "white",
    borderRadius: 22,
    height: 90,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  filmCoverImage: {
    flex: 0.2,
    backgroundColor: "#8CD2FD",
    width: 65,
    height: 90
  },
  filmTitle: {
    flex: 0.8,
    paddingLeft: 12,
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 24
  }
});
