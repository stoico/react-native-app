import React from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  WebView,
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
                <Image
                  source={require("../assets/backdrop.png")}
                  style={{ borderRadius: 26, width: "100%" }}
                />
                <View style={styles.filmSuggestedBox}>
                  <Text style={styles.filmTitleOutside}>{filmTitle}</Text>
                  <View style={styles.categoryNameRounded}>
                    <Text style={styles.categoryNameText}>Consigliato da</Text>
                  </View>

                  <View style={styles.feedUserSuggests}>
                    <Image
                      source={require("../assets/avatar.png")}
                      resizeMode="contain"
                      style={styles.userAvatar}
                    />
                    <Text style={styles.userNameText}>Stefano</Text>
                  </View>

                  <View style={styles.categoryNameRounded}>
                    <Text style={styles.categoryNameText}>Trailer</Text>
                  </View>
                  <WebView
                    style={{
                      flex: 1,
                      width: 340,
                      borderRadius: 26,
                      overflow: "hidden"
                    }}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    source={{
                      uri:
                        "https://www.youtube.com/embed/T77PDm3e1iE?rel=0&autoplay=0&showinfo=0&controls=0"
                    }}
                  />
                  <View style={styles.categoryNameRounded}>
                    <Text style={styles.categoryNameText}>Storia</Text>
                  </View>
                  <Text
                    style={{ color: "#505050", fontWeight: "500", padding: 4 }}
                  >
                    In the mythical continent of Westeros, several powerful
                    families fight for control of the Seven Kingdoms. As
                    conflict erupts in the kingdoms of men, an ancient enemy
                    rises once again to threaten them all. Meanwhile, the last
                    heirs of a recently usurped dynasty plot to take back their
                    homeland from across the Narrow Sea.
                  </Text>
                </View>
              </View>
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
    marginBottom: 6,
    marginTop: 2
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
    marginTop: -42,
    flex: 1,
    overflow: "hidden",
    flexDirection: "column",
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
    fontSize: 36,
    alignSelf: "center",
    height: 45,
    marginTop: 5
  },
  categoryNameRounded: {
    width: "auto",
    backgroundColor: "#EAEAEA",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 8
  },
  categoryNameText: {
    color: "rgba(80, 80, 80, 0.5)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 14,
    textTransform: "uppercase"
  }
});
