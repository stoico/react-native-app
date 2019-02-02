import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  WebView,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { Font, LinearGradient, AppLoading } from "expo";
import { database } from "../config/Firebase";
import firebase from "firebase";
import dayjs from "dayjs";
import it from "dayjs/locale/it";

import Header from "../components/Header/Header";
import RecommendFilmButton from "../components/RecommendFilmButton/";

export default class FilmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontHasLoaded: false,
      dataHasLoaded: false,
      plotCollapsed: true
    };

    const filmID = this.props.navigation.getParam("filmID");
    const mediaType = this.props.navigation.getParam("mediaType");

    // Check whether it's a film or tv series
    let uriAPI =
      "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      filmID +
      "?api_key=f521cf48d44225747ebbec6f1b76573a&language=it&region=IT&append_to_response=videos";

    console.log(uriAPI);

    fetch(uriAPI)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ dataHasLoaded: true, data: responseJSON });
        console.log("________________Film data ___________________");
        console.log(responseJSON);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf"),
      "Gilroy Bold": require("../assets/fonts/gilroy-bold.ttf"),
      "Gilroy Medium": require("../assets/fonts/gilroy-medium.ttf")
    });
    this.setState({ fontHasLoaded: true });
  }

  render() {
    const { navigation } = this.props;
    const filmTitle = navigation.getParam("filmTitle", "Temp film");
    const filmID = navigation.getParam("filmID");

    if (!this.state.fontHasLoaded || !this.state.dataHasLoaded) {
      return <AppLoading />;
    } else {
      const filmData = this.state.data;
      const filmPosterPath = filmData.poster_path;
      dayjs.locale("it-italian", it);

      const formattedReleaseDate = dayjs(filmData.release_date).format(
        "MMM YYYY"
      );
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Show" navigation={this.props.navigation} />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.primaryContainer}>
              <View style={styles.secondaryContainer}>
                <Image
                  source={{
                    uri:
                      "https://image.tmdb.org/t/p/w780" + filmData.backdrop_path
                  }}
                  style={styles.backdropImage}
                />
                <View style={styles.tertiaryContainer}>
                  <Text style={styles.filmTitleOutside}>{filmTitle}</Text>
                  <View style={styles.centerCategoryNameRounded}>
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

                  {filmData.overview && filmData.overview.length !== 0 && (
                    <React.Fragment>
                      <View style={styles.centerCategoryNameRounded}>
                        <Text style={styles.categoryNameText}>Storia</Text>
                      </View>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.setState({
                            plotCollapsed: !this.state.plotCollapsed
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.plotParagraph,
                            this.state.plotCollapsed
                              ? { height: 130 }
                              : { height: "auto" }
                          ]}
                        >
                          {filmData.overview}
                        </Text>
                      </TouchableWithoutFeedback>

                      <Text
                        style={{
                          textAlign: "left",
                          width: "100%",
                          marginTop: -6,
                          paddingRight: 12,
                          paddingLeft: 12
                        }}
                      >
                        {this.state.plotCollapsed ? "..." : null}
                      </Text>
                    </React.Fragment>
                  )}

                  <View style={styles.multipleCategoryContainer}>
                    <View style={styles.multipleCategoryRounded}>
                      <Text style={styles.categoryNameText}>Voto</Text>
                    </View>
                    <View style={styles.multipleCategoryRounded}>
                      <Text style={styles.categoryNameText}>Durata</Text>
                    </View>
                    <View style={styles.multipleCategoryRounded}>
                      <Text style={styles.categoryNameText}>Uscita</Text>
                    </View>
                  </View>

                  <View style={styles.multipleCategoryContainer}>
                    <View style={styles.multipleCategoryInfo}>
                      <Text style={styles.categoryInfoText}>
                        {filmData.vote_average}
                        <Text style={{ fontSize: 13 }}>/10</Text>
                      </Text>
                    </View>
                    <View style={styles.multipleCategoryInfo}>
                      <Text style={styles.categoryInfoText}>
                        {filmData.runtime}
                        <Text style={{ fontSize: 13 }}>min</Text>
                      </Text>
                    </View>
                    <View style={styles.multipleCategoryInfo}>
                      <Text style={styles.categoryInfoText}>
                        <Text style={{ fontSize: 14 }}>
                          {formattedReleaseDate}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={styles.centerCategoryNameRounded}>
                    <Text style={styles.categoryNameText}>Trailer</Text>
                  </View>
                  {filmData.videos && filmData.videos.results[0] && (
                    <WebView
                      style={styles.videoTrailer}
                      javaScriptEnabled={true}
                      scrollEnabled={false}
                      source={{
                        uri:
                          "https://www.youtube.com/embed/" +
                          filmData.videos.results[0].key +
                          "?rel=0&autoplay=0&showinfo=0&controls=0"
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={styles.bottomSpacing} />
            </View>
          </ScrollView>

          <View style={styles.floatingPositionForButton}>
            <LinearGradient
              style={styles.gradientBehindButton}
              colors={greyGradient}
            >
              <RecommendFilmButton
                filmID={filmID}
                filmTitle={filmTitle}
                posterPath={filmPosterPath}
              />
            </LinearGradient>
          </View>
        </View>
      );
    }
  }
}

const greyGradient = ["rgba(224, 224, 224, 0)", "#E0E0E0"];

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  primaryContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    flex: 1
  },
  secondaryContainer: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#F7F7F7",
    marginBottom: 10,
    padding: 10,
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
  },
  tertiaryContainer: {
    backgroundColor: "white",
    borderRadius: 22,
    marginTop: -65,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  },
  feedUserSuggests: {
    flexDirection: "row",
    height: 36,
    marginTop: 2
  },
  userAvatar: {
    width: 36,
    height: 36,
    marginRight: 8
  },
  userNameText: {
    fontFamily: "Gilroy Bold",
    color: "rgba(80, 80, 80, 0.9)",
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
    textAlign: "center",
    marginTop: 5,
    paddingLeft: 12,
    paddingRight: 12
  },
  multipleCategoryContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8
  },
  multipleCategoryRounded: {
    backgroundColor: "#F2F2F2",
    minWidth: 99,
    marginLeft: 4,
    marginRight: 4,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  centerCategoryNameRounded: {
    width: "auto",
    backgroundColor: "#F2F2F2",
    minWidth: 99,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8
  },
  categoryNameText: {
    color: "rgba(80, 80, 80, 0.5)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 14,
    textTransform: "uppercase"
  },
  multipleCategoryInfo: {
    marginTop: -32,
    minWidth: 99,
    marginLeft: 4,
    marginRight: 4,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  categoryInfoText: {
    color: "rgb(80, 80, 80)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 22
  },
  backdropImage: {
    flex: 1,
    borderRadius: 26,
    width: 339,
    height: 180
  },
  plotParagraph: {
    color: "#505050",
    fontFamily: "Gilroy Medium",
    padding: 4,
    fontSize: 16,
    lineHeight: 20,
    paddingLeft: 12,
    paddingRight: 12
  },
  videoTrailer: {
    height: 180,
    width: 320,
    marginBottom: 8,
    borderRadius: 20,
    overflow: "hidden"
  },
  floatingPositionForButton: {
    flex: 1,
    position: "absolute",
    width: "100%",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    zIndex: 1
  },
  gradientBehindButton: {
    height: 85,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 7,
    paddingRight: 90,
    paddingLeft: 90,
    paddingBottom: 18
  },
  gradientBehindHeader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});
