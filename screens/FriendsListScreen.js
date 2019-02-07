import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Alert,
  TouchableOpacity
} from "react-native";
import { LinearGradient, Font, AppLoading, Permissions, Contacts } from "expo";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header/Header";
import FriendBox from "../components/FriendBox";
import AddFriendButton from "../components/AddFriendButton";

export default class FriendsListScreen extends React.Component {
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

  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
  };

  async showFirstContactAsync() {
    console.log("showFirstContactAsync");
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== "granted") {
      // Permission was denied...
      Alert.alert("Permission denied");
      return;
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS],
      pageSize: 10,
      pageOffset: 0
    });
    if (contacts.total > 0) {
      Alert.alert(
        "Your first contact is...",
        `Name: ${contacts.data[0].name}\n` +
          `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n`
      );
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Amici" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.feedContainer}>
              <FriendBox name="Stefano" />
              <FriendBox name="Carmine" />
              <FriendBox name="Martina" />
              <FriendBox name="Rocco" />
              <FriendBox name="Angelo" />
              <FriendBox name="Marco" />
              <FriendBox name="Raffaella" />
              <View style={styles.bottomSpacing} />
            </View>
          </ScrollView>
          <View style={styles.floatingPositionForButton}>
            <LinearGradient
              style={styles.gradientBehindButton}
              colors={greyGradient}
            >
              {/* AddFriendButton */}
              <TouchableOpacity
                style={styles.blueSuggestionButton}
                onPress={this.showFirstContactAsync}
              >
                <Ionicons
                  style={styles.iconMore}
                  name="md-person-add"
                  size={24}
                  color="#fff"
                />
                <Text style={styles.textOfBlueButton}>Aggiungi amico</Text>
              </TouchableOpacity>
              {/* End */}
            </LinearGradient>
          </View>
        </View>
      );
    }
  }
}

const greyGradient = ["rgba(224, 224, 224, 0)", "#E0E0E0"];
const temporaryGradient = ["black", "blue"]; // Used for testing as more visible

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  feedContainer: {
    marginTop: 82,
    padding: 8,
    backgroundColor: "#F7F7F7",
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
  },
  blueSuggestionButton: {
    flex: 1,
    height: 60,
    borderRadius: 35,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#2EA6FF",
    borderColor: "rgba(26, 141, 211, 0.30)",
    borderWidth: 1,
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: "#2EA6FF",
    shadowOffset: { width: 0, height: 4 }
  },
  textOfBlueButton: {
    fontFamily: "Gilroy Extrabold",
    justifyContent: "center",
    alignSelf: "center",
    color: "#F8F8F8",
    fontSize: 20
  },
  iconMore: {
    position: "absolute",
    top: 17,
    left: 40
  }
});
