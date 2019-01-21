import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar
} from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "../components/HeaderSection";
import NewReleasesBox from "../components/NewReleasesBox";

export default class NewReleasesScreen extends React.Component {
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
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <HeaderSection
            pageTitle="Nuove uscite"
            navigation={this.props.navigation}
          />
          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              {/* <Button
                title="Go to Details"
                onPress={() =>
                  this.props.navigation.navigate("Film", {
                    filmID: Math.floor(Math.random() * 100)
                  })
                }
              /> */}
              <NewReleasesBox
                dateReleased="12/07/2018"
                navigation={this.props.navigation}
              />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
              <NewReleasesBox dateReleased="12/07/2018" {...this.props} />
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
  feedContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30
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
    paddingRight: 36,
    paddingLeft: 36,
    paddingBottom: 18
  },
  gradientBehindHeader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  bottomSpacing: {
    height: 85,
    flex: 1
  }
});
