import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { Font, AppLoading } from "expo";

import Header from "../components/Header/Header";
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

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    const { navigation } = this.props;
    const filmTitle = navigation.getParam("filmTitle", "Temp film");

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header
            pageTitle="Profilo personale"
            navigation={this.props.navigation}
          />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.userContainer}>
                  <View style={styles.userWhiteBox}>
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
                      <Text style={styles.userNameBigText}>Carmine</Text>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.props.navigation.navigate("FriendsList")
                        }
                      >
                        <View
                          style={{
                            flex: 0.5,
                            borderRadius: 40,
                            width: 120,
                            backgroundColor: "#2EA6FF",
                            alignItems: "center",
                            justifyContent: "center",
                            borderColor: "rgba(26,141,211, 0.3)",
                            borderWidth: 1
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontFamily: "Gilroy Extrabold",
                              fontSize: 20
                            }}
                          >
                            Amici
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
                <Button onPress={this.onSignOut} title="Sign out" />
                <View style={styles.categoryNameRounded}>
                  <Text style={styles.categoryNameText}>Ho consigliato</Text>
                </View>
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
  outmostContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    height: 650
  },
  profileContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    height: 148,
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  userNameBigText: {
    color: "#505050",
    fontFamily: "Gilroy Extrabold",
    fontSize: 38
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30
  },
  userWhiteBox: {
    flex: 0.81,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 22,
    alignItems: "center",
    height: 150,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "rgba(215,215,215, 0.5)",
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
    marginBottom: 8
  },
  categoryNameText: {
    color: "rgba(80, 80, 80, 0.5)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 14,
    textTransform: "uppercase"
  }
});
