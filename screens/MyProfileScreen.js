import React from "react";
import {
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "../components/HeaderSection";
import SuggestedBox from "../components/SuggestedBox";

export default class MyProfileScreen extends React.Component {
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
          <HeaderSection pageTitle="Profilo Personale" />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.filmContainer}>
              <View style={styles.feedSuggestionBox}>
                <View style={styles.userContainer}>
                  <View style={styles.userBox}>
                    <View style={styles.userAvatarFloating}>
                      <ImageBackground
                        source={require("../assets/profile-avatar-105.png")}
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          borderRadius: "100%"
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        paddingLeft: 15
                      }}
                    >
                      <Text
                        style={{
                          color: "#505050",
                          fontFamily: "Gilroy Extrabold",
                          fontSize: 38
                        }}
                      >
                        Carmine
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.filmTitle}>Consigliati da me</Text>
                <SuggestedBox filmTitle="Game of Thrones" />
                <SuggestedBox filmTitle="Westworld" />
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
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  userBox: {
    flex: 0.81,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 22,
    alignItems: "center",
    height: 150,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 5 }
  },
  userAvatarFloating: {
    width: 105,
    height: 105,
    borderRadius: 105 / 2,
    marginLeft: -64,
    backgroundColor: "#2EA6FF",
    borderColor: "#2EA6FF",
    borderWidth: 13,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1, //    made up these
    shadowRadius: 9, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "rgba(46,166,255, 0.70)",
    shadowOffset: { width: 0, height: 4 }
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
  }
});
