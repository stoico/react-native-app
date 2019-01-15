import React from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet
} from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "../components/HeaderSection";

export default class FilmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigation } = this.props;
    const filmTitle = navigation.getParam("filmTitle", "Temp film");

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <HeaderSection pageTitle="Show" />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.filmContainer}>
              <View style={styles.feedSuggestionBox}>
                <Text style={styles.filmTitleOutside}>{filmTitle}</Text>

                <View style={styles.filmSuggestedBox}>
                  <Image
                    source={require("../assets/cover3.png")}
                    style={styles.filmCoverImageBig}
                  />
                  <View style={styles.filmTitleBigContainer}>
                    <Text style={styles.filmTitleBig}>{filmTitle}</Text>
                    <Text style={styles.filmTitleBig}>
                      {this.props.filmTitle || "The Titled Film"}
                    </Text>
                    <Text style={styles.filmTitleBig}>
                      {this.props.filmTitle || "The Titled Film"}
                    </Text>
                  </View>
                </View>
                <Text style={styles.filmTitle}>
                  Film ID: {JSON.stringify(filmTitle)}
                </Text>
              </View>
              <View style={styles.bottomSpacing} />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  filmContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    height: 650
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  },
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
    fontFamily: "Gilroy Extrabold",
    color: "rgba(80, 80, 80, 0.8)",
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
    height: 200,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  filmCoverImageBig: {
    flex: 0.4,
    backgroundColor: "#8CD2FD",
    height: "100%"
  },
  filmTitleBigContainer: {
    flex: 0.6,
    paddingLeft: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%"
  },
  filmTitleBig: {
    flex: 0.2,
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 26
  },
  filmTitleOutside: {
    fontFamily: "Gilroy Extrabold",
    color: "#505050",
    fontSize: 30,
    alignSelf: "center",
    height: 45
  }
});
