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
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf"),
      "Gilroy Bold": require("../assets/fonts/gilroy-bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const filmTitle = this.props.filmTitle || "The Titled Film";
    const filmID = this.props.filmID;

    const pathTMDB = "https://image.tmdb.org/t/p/w154" + this.props.filmPoster;

    // Render boxes only if fonts and posters have loaded
    if (!this.state.fontLoaded || !this.props.filmPoster) {
      return <AppLoading />;
    } else {
      console.log(pathTMDB);
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
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Film", {
                filmID: filmID,
                filmTitle: filmTitle,
                mediaType: this.props.mediaType
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
    height: 36,
    marginBottom: 6
  },
  userAvatar: {
    width: 36,
    height: 36,
    marginRight: 8
  },
  userNameText: {
    fontFamily: "Gilroy Bold",
    color: "rgba(80, 80, 80, 0.9)",
    fontSize: 20,
    height: 36,
    lineHeight: 36
  },
  userNameSuggestsText: {
    fontFamily: "Gilroy Light",
    color: "rgba(80, 80, 80, 0.8)", // or #505050
    fontSize: 12,
    marginLeft: 3,
    marginTop: 1,
    height: 36,
    lineHeight: 36
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
  }
});
