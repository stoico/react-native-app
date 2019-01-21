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
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: 800,
            backgroundColor: "#2EA6FF",
            zIndex: -1
          }}
        >
          {/* Header container */}
          <View
            style={{
              flex: 1,
              height: 120,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <LinearGradient
              colors={blueGradient}
              style={styles.gradientBehindHeader}
              locations={
                [0, 0.09, 0.5, 0.6, 1] // locations={[0, 0.2, 1]}
              }
            >
              <ImageBackground
                source={require("../assets/header-pattern.png")}
                style={{
                  flex: 1,
                  width: "100%",
                  height: 50,
                  marginTop: 40,
                  alignSelf: "center",
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                    top: 20
                  }}
                >
                  <Image
                    source={require("../assets/back-button.png")}
                    style={styles.backButton}
                  />
                </TouchableWithoutFeedback>
                <Text
                  style={
                    {
                      flex: 1,
                      marginTop: 2,
                      color: "white",
                      fontFamily: "Gilroy Extrabold",
                      fontSize: 23,
                      alignSelf: "center"
                    } // marginTop: 6,
                  }
                >
                  {this.props.pageTitle}
                </Text>
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
  gradientBehindHeader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  backButton: {
    marginTop: 5,
    marginLeft: 30,
    width: 15,
    height: 22
  }
});
