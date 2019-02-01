import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient, Font, AppLoading } from "expo";

export default class HeaderSection extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../../assets/fonts/gilroy-extrabold.otf")
    }).catch(err => console.log(err));
    this.setState({ fontLoaded: true });

    // This outputs the length of the stack containing the navigation screen that have been visited.
    console.log(this.props.navigation.state.routeName);
  }

  renderBackButton() {
    let routeName = this.props.navigation.state.routeName;
    const routesWithoutBackButton = [
      "Home",
      "Ranking",
      "MyProfile",
      "Signup",
      "Onboard"
    ];

    if (!routesWithoutBackButton.includes(routeName)) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButtonArea}
        >
          <Image
            source={require("../../assets/back-button.png")}
            style={styles.backButton}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return <View />;
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.outerContainer}>
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={blueGradient}
              style={styles.gradientBehindHeader}
              locations={
                [0, 0.09, 0.5, 0.6, 1] // locations={[0, 0.2, 1]}
              }
            >
              <ImageBackground
                source={require("../../assets/header-pattern.png")}
                style={styles.headerPatternBackground}
              >
                {this.renderBackButton()}

                <Text style={styles.headerTitle}>{this.props.pageTitle}</Text>
                {/* <View>Icon on the right </View> */}

                <View />

                {/* <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.backButtonArea}
                >
                  <Image
                    source={require("../../assets/back-button.png")}
                    style={styles.forGigglesButton}
                  />
                </TouchableWithoutFeedback> */}
              </ImageBackground>
            </LinearGradient>
          </View>
        </View>
      );
    }
  }
}

const blueGradient = ["#0075FF", "#2EA6FF", "#2EA6FF", "#E0E0E0", "#E0E0E0"];

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 800,
    backgroundColor: "#2EA6FF",
    zIndex: -1
  },
  headerContainer: {
    flex: 1,
    height: 120,
    justifyContent: "center",
    alignContent: "center"
  },
  gradientBehindHeader: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center"
  },
  headerPatternBackground: {
    flex: 0.1,
    width: "100%",
    height: 50,
    marginTop: 40,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  backButtonArea: {
    flex: 0.2,
    height: 20,
    alignSelf: "flex-start"
  },
  backButton: {
    // marginTop: 2,
    marginTop: 7,
    width: 15,
    height: 22
  },
  forGigglesButton: {
    marginTop: 7,
    width: 15,
    height: 22,
    transform: [{ rotate: "180deg" }]
  },
  headerTitle: {
    flex: 0.6,
    marginTop: 2,
    color: "white",
    fontFamily: "Gilroy Extrabold",
    fontSize: 23,
    textAlign: "center"
    // marginTop: 6
  }
});
