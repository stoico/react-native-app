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
        <React.Fragment>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Film", {
                filmTitle: filmTitle,
                filmID: this.props.filmID,
                mediaType: this.props.mediaType
              })
            }
          >
            <View style={styles.filmSuggestedBox}>
              <View style={styles.borderRadius}>
                <Image
                  source={{ uri: pathTMDB }}
                  style={styles.filmCoverImage}
                />
              </View>
              <Text style={styles.filmTitle}>{filmTitle}</Text>
            </View>
          </TouchableWithoutFeedback>
        </React.Fragment>
      );
    }
  }
}

const styles = StyleSheet.create({
  filmSuggestedBox: {
    backgroundColor: "white",
    borderRadius: 22,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 4, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "rgba(215,215,215, 0.4)",
    shadowOffset: { width: 0, height: 2 }
  },
  filmCoverImage: {
    backgroundColor: "#8CD2FD",
    width: 65,
    height: 90
  },
  borderRadius: {
    borderBottomLeftRadius: 22,
    borderTopLeftRadius: 22,
    width: 65,
    height: 90,
    overflow: "hidden"
  },
  filmTitle: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 24
  }
});
