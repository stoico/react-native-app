import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Font, AppLoading } from "expo";

export default class RankingSuggestionBox extends React.Component {
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

    // If the there are more one person recommending, then use the plural verb
    // else the singular
    const suggestText =
      this.props.numberOfRecommendations > 1 ? "consigliano" : "consiglia";
    // Same as above. Generate string of text depending on singular or plural form
    const friendsText =
      this.props.numberOfRecommendations > 1 ? "amici" : "amico";

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.feedSuggestionBox}>
          <View style={styles.feedUserSuggests}>
            <Text style={styles.numberOfFriendsRecommending}>
              {this.props.numberOfRecommendations} {friendsText}
            </Text>
            <Text style={styles.friendsRecommendText}> {suggestText}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Film", {
                filmTitle: filmTitle
              })
            }
          >
            <View style={styles.filmSuggestedBox}>
              <Image
                source={require("../assets/cover1.png")}
                style={styles.filmCoverImage}
              />
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
  numberOfFriendsRecommending: {
    fontFamily: "Gilroy Extrabold",
    color: "rgba(80, 80, 80, 0.8)",
    fontSize: 20,
    height: 36,
    lineHeight: 36,
    marginLeft: 14
  },
  friendsRecommendText: {
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
