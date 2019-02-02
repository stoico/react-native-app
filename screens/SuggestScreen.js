import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  LayoutAnimation
} from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header/Header";
import SearchResultBox from "../components/SearchResultBox";

export default class FriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      text: "",
      subHeadingVisible: true,
      dataHasLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf"),
      "Gilroy Bold": require("../assets/fonts/gilroy-bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  onTextChange = text => {
    this.setState({ text });

    let uriAPI =
      "https://api.themoviedb.org/3/search/multi?api_key=f521cf48d44225747ebbec6f1b76573a&language=it&region=IT&page=1&query=" +
      text;

    if (text.length >= 2) {
      fetch(uriAPI)
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({ dataHasLoaded: true, dataFromAPI: responseJSON });
        })
        .catch(error => {
          console.error(error);
        });
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  onClearInput = () => {
    this.setState({ text: "" });
  };

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

    let searchResultData;
    // (
    //   <SearchResultBox
    //     filmID="  "
    //     filmPosterPath="  "
    //     filmTitle="  "
    //     lastChild={true}
    //     key="loading"
    //   />
    // );

    const maxNumberOfResults = 8;
    if (this.state.text.length >= 2 && this.state.dataFromAPI) {
      let dataResultsArrayLength = this.state.dataFromAPI.results.length;
      searchResultData = this.state.dataFromAPI.results
        .slice(0, maxNumberOfResults)
        .map((item, index) => {
          if (
            item &&
            (item.media_type === "tv" || item.media_type === "movie")
          ) {
            // Select the last child
            if (
              index + 1 === dataResultsArrayLength ||
              index + 1 === maxNumberOfResults
            ) {
              // If it's a tv series
              if (item.name) {
                return (
                  <SearchResultBox
                    filmID={item.id}
                    filmPosterPath={item.poster_path}
                    filmTitle={item.name}
                    mediaType={item.media_type}
                    lastChild={true}
                    key={item.name + index.toString()}
                    navigation={this.props.navigation}
                  />
                );
              } else {
                // Or else a film
                return (
                  <SearchResultBox
                    filmID={item.id}
                    filmPosterPath={item.poster_path}
                    filmTitle={item.title}
                    mediaType={item.media_type}
                    lastChild={true}
                    key={item.name + index.toString()}
                    navigation={this.props.navigation}
                  />
                );
              }
            }
            // All th elements that are not the last
            if (item.name) {
              return (
                <SearchResultBox
                  filmID={item.id}
                  filmPosterPath={item.poster_path}
                  filmTitle={item.name}
                  mediaType={item.media_type}
                  lastChild={false}
                  key={item.name + index.toString()}
                  navigation={this.props.navigation}
                />
              );
            } else {
              // Or else a film
              return (
                <SearchResultBox
                  filmID={item.id}
                  filmPosterPath={item.poster_path}
                  filmTitle={item.title}
                  mediaType={item.media_type}
                  lastChild={false}
                  key={item.name + index.toString()}
                  navigation={this.props.navigation}
                />
              );
            }
          }
        });
    }

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Consiglia" navigation={this.props.navigation} />

          <ScrollView
            style={styles.screenContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.outmostContainer}>
              <View style={styles.secondaryContainer}>
                <View style={styles.userContainer} />
                {this.displaySubHeading()}

                <View
                  style={[
                    {
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
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
                    this.state.text.length < 2 ? styles.roundedCorners : null
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 63,
                      padding: 10,
                      width: "100%",
                      fontSize: 20
                    }}
                  >
                    <TextInput
                      style={
                        {
                          flex: 0.8,
                          paddingLeft: 15,
                          color: "rgba(80, 80, 80, 0.8)",
                          fontFamily: "Gilroy Extrabold",
                          fontSize: 20
                        }

                        // color: "#E0E0E0",
                      }
                      placeholder="Film o serie TV" // placeholderTextColor="rgba(80, 80, 80, 0.8)"
                      onChangeText={this.onTextChange}
                      value={this.state.text}
                    />
                    <View
                      style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {this.state.text.length >= 2 ? (
                        <TouchableWithoutFeedback onPress={this.onClearInput}>
                          <Ionicons
                            name="md-close-circle"
                            size={24}
                            color="#E0E0E0"
                          />
                        </TouchableWithoutFeedback>
                      ) : (
                        <Ionicons name="md-search" size={24} color="#E0E0E0" />
                      )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    shadowColor: "rgba(215,215,215, 0.5)",
                    shadowOffset: { width: 0, height: 8 }
                  }}
                >
                  {searchResultData ? searchResultData : null}
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
    minHeight: 675
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
