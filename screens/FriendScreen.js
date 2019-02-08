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
import * as Animatable from "react-native-animatable";

import Header from "../components/Header/Header";
import SuggestedBox from "../components/SuggestedBox";

export default class FriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      friendName: "Ca",
      recommendations: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }
  componentWillMount() {
    // this.getFriendName();
    this.getUserRecommendations();
  }

  // getFriendName() {
  //   //Get the current userID
  //   const userId = firebase.auth().currentUser.uid;
  //   //Get the user data
  //   return firebase
  //     .database()
  //     .ref("/users/" + userId)
  //     .once("value")
  //     .then(snapshot => {
  //       this.setState({ friendName: snapshot.val().name });
  //     });
  // }

  getUserRecommendations() {
    //Get the current userID
    const friendID = this.props.navigation.getParam("friendID");

    database
      .ref("/recommendations/")
      .child(friendID)
      // .limitToLast(8)
      .on("value", snapshot => {
        console.log("snapshot.val: " + snapshot.val());
        // Object.values() requires parameter not be null
        if (snapshot.val()) {
          this.setState({
            recommendations: Object.values(snapshot.val()) || null
          });
        } else {
          this.setState({
            recommendations: null
          });
        }
      });
  }

  // Needs async
  renderSuggestedBox() {
    console.log("this.state.recommendations:");
    console.log(this.state.recommendations);
    if (this.state.recommendations) {
      return this.state.recommendations
        .reverse()
        .map((recommendation, index) => (
          <Animatable.View
            duration={250}
            animation="fadeInUp"
            // each child of an iterator needs a unique key
            key={recommendation.showID}
            useNativeDriver={true}
            delay={80 * index}
          >
            <SuggestedBox
              filmTitle={recommendation.showTitle}
              filmID={recommendation.showID}
              filmPoster={recommendation.showPosterPath}
              // Temporarily hard code Movie for testing
              filmType={recommendation.mediaType || "movie"}
              isFriend={true}
              navigation={this.props.navigation}
            />
          </Animatable.View>
        ));
    } else {
      console.log("No recommendations found.");
      return (
        <Text>Qui appariranno i tuoi consigli. Al momento non ce ne sono.</Text>
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const friendName = navigation.getParam("friendName", " ");
    const friendID = navigation.getParam("friendID", " ");

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Amico" navigation={this.props.navigation} />

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
                          borderRadius: "50"
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
                      <Text style={styles.userNameBigText}>{friendName}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.categoryNameRounded}>
                  <Text style={styles.categoryNameText}>Ha consigliato</Text>
                </View>

                {this.renderSuggestedBox()}
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
    minHeight: 650
  },
  profileContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    minHeight: 148,
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
    borderRadius: 52.5, // 105 / 2
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
