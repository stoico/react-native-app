import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import { Font, AppLoading } from "expo";

import Header from "../components/Header/Header";
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
  displaySubHeading() {
    if (this.state.text === "") {
      return (
        <Text style={styles.subHeading}>
          Cerca uno show da consigliare ai tuoi amici
        </Text>
      );
    }
  }

  render() {
    const { navigation } = this.props;

    const data = [
      { name: "You" },
      { name: "Game of Thrones" },
      { name: "Westworld" }
    ];

    const searchResultData = data.map((item, i) => {
      if (this.state.text.length >= 2) {
        // Select the last child
        if (i === data.length - 1) {
          return (
            <SearchResultBox
              filmTitle={this.state.text}
              lastChild={true}
              key={item.name + i.toString()}
            />
          );
        }
        // All th elements that are not the last
        return (
          <SearchResultBox
            filmTitle={i.name}
            lastChild={false}
            key={item.name + i.toString()}
          />
        );
      }
    });

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Consiglia" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                <View style={styles.userContainer} />
                {this.displaySubHeading()}
                <TextInput
                  style={
                    [
                      {
                        height: 63,
                        borderTopLeftRadius: 14,
                        borderTopRightRadius: 14,
                        padding: 15,
                        color: "rgba(80, 80, 80, 0.8)",
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
                    ] // color: "#E0E0E0",
                  }
                  placeholder="Film o serie TV"
                  // placeholderTextColor="rgba(80, 80, 80, 0.8)"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                <View
                  style={{
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    shadowColor: "rgba(215,215,215, 0.5)",
                    shadowOffset: { width: 0, height: 8 }
                  }}
                >
                  {searchResultData}
                </View>

                {/* TODO: Add the 'Seleziona' button */}
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
  outmostContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    height: 675
  },
  secondaryContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
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
