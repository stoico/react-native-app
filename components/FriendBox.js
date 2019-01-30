import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Font, AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { isiOS } from "../constants/Platform";

export default class FriendBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
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

  // Determine which icon to display depending on whether the app
  // is run on an Android or iOS device
  displayDeviceIcon() {
    if (isiOS) {
      return (
        <Ionicons
          style={styles.iconMore}
          name="ios-more"
          size={20}
          color="rgba(50, 50, 50, 0.4)"
        />
      );
    } else {
      return (
        <Ionicons
          style={styles.iconMore}
          name="md-more"
          size={20}
          color="rgba(50, 50, 50, 0.4)"
        />
      );
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.feedSuggestionBox}>
          <View style={styles.feedUserSuggests}>
            <Image
              source={require("../assets/avatar.png")}
              resizeMode="contain"
              style={styles.userAvatar}
            />
            <Text style={styles.userNameText}>{this.props.name}</Text>
            {this.displayDeviceIcon()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  feedSuggestionBox: {
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
  feedUserSuggests: {
    flexDirection: "row",
    height: 36
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
  iconMore: {
    position: "absolute",
    top: 10,
    right: 20
  }
});
