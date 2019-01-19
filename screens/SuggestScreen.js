import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "../components/HeaderSection";
import SuggestedBox from "../components/SuggestedBox";
import SearchResultBox from "../components/SearchResultBox";

export default class FriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, text: "", subHeadingVisible: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  // Determine which icon to display depending on whether the app
  // is run on an Android or iOS device
  displaySearchResultBoxes() {
    if (this.state.text === "You") {
      return (
        <React.Fragment>
          <SearchResultBox filmTitle={this.state.text} />
          <SearchResultBox filmTitle="You 2" />
        </React.Fragment>
      );
    }
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
          <HeaderSection pageTitle="Consiglia" />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                <View style={styles.userContainer} />
                <Text style={styles.subHeading}>
                  Seleziona uno show da consigliare ai tuoi amici
                </Text>
                <TextInput
                  style={[
                    {
                      height: 63,
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      padding: 15,
                      color: "#E0E0E0",
                      width: "100%",
                      fontFamily: "Gilroy Extrabold",
                      backgroundColor: "#fff",
                      fontSize: 20,
                      shadowOpacity: 1,
                      shadowRadius: 8,
                      shadowColor: "rgba(215,215,215, 0.5)",
                      shadowOffset: { width: 0, height: 5 }
                    },
                    this.state.text === "" ? styles.roundedCorners : null
                  ]}
                  placeholder="Film o serie TV"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                {this.displaySearchResultBoxes()}
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
  secondaryContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    marginBottom: -25,
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  subHeading: {
    marginTop: 35,
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(80, 80, 80)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 24
  },
  roundedCorners: {
    borderRadius: 14
  }
});
