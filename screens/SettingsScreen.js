import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Button,
  Alert
} from "react-native";
import { database } from "../config/Firebase";
import firebase from "firebase";
import { Font, AppLoading } from "expo";
import * as Animatable from "react-native-animatable";
import SettingsList from "react-native-settings-list";

import Header from "../components/Header/Header";
import SuggestedBox from "../components/SuggestedBox";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      chosenName: "",
      switchValue: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Gilroy Light": require("../assets/fonts/gilroy-light.otf"),
      "Gilroy Extrabold": require("../assets/fonts/gilroy-extrabold.otf")
    });
    this.setState({ fontLoaded: true, chosenName: "" });
  }

  componentWillMount() {
    this.getChosenName();
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  getChosenName() {
    //Get the current userID
    var userId = firebase.auth().currentUser.uid;
    //Get the user data
    return firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => {
        this.setState({ chosenName: snapshot.val().name });
      });
  }

  render() {
    const { navigation } = this.props;
    const filmTitle = navigation.getParam("filmTitle", "?");
    let longBio =
      "This is an extrmeely long and boring bio with information and bullshit and braga about myself. Let's be real. Paradise.";
    longBio = longBio.substring(0, 25) + "...";

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header pageTitle="Impostazioni" navigation={this.props.navigation} />

          <ScrollView style={styles.screenContainer}>
            <View style={styles.outmostContainer}>
              <View style={styles.profileContainer}>
                <Button onPress={this.onSignOut} title="Sign out" />
                <View style={styles.categoryNameRounded}>
                  <Text style={styles.categoryNameText}>Modifica</Text>
                </View>
                {/* START */}
                <SettingsList
                  backgroundColor="#FFF"
                  borderColor="#E0E0E0"
                  defaultItemSize={50}
                >
                  <SettingsList.Header headerStyle={{ marginTop: 0 }} />
                  <SettingsList.Item
                    titleInfo={this.state.chosenName}
                    title="Nome"
                  />
                  <SettingsList.Item
                    title="Bio"
                    titleInfo={longBio}
                    onPress={() => Alert.alert("Route to Wifi Page")}
                  />
                  <SettingsList.Item
                    title="Blutooth"
                    titleInfo="Off"
                    titleInfoStyle={styles.titleInfoStyle}
                    onPress={() => Alert.alert("Route to Blutooth Page")}
                  />
                  <SettingsList.Item
                    title="Cellular"
                    onPress={() => Alert.alert("Route To Cellular Page")}
                  />
                  <SettingsList.Header headerStyle={{ marginTop: 10 }} />

                  <SettingsList.Item
                    title="Personal Hotspot"
                    titleInfo="Off"
                    titleInfoStyle={styles.titleInfoStyle}
                    onPress={() => Alert.alert("Route To Hotspot Page")}
                  />
                  <SettingsList.Item
                    hasNavArrow={false}
                    switchState={this.state.switchValue}
                    switchOnValueChange={() =>
                      this.setState({
                        switchValue: !this.state.switchValue
                      })
                    }
                    hasSwitch={true}
                    title="Notifiche"
                  />
                  <SettingsList.Header headerStyle={{ marginTop: 0 }} />
                  <SettingsList.Item
                    title="Sign out"
                    hasNavArrow={false}
                    titleStyle={styles.signOut}
                    onPress={() => Alert.alert("Sign out")}
                  />
                </SettingsList>
                {/* END */}
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
    shadowOpacity: 1, //    made up these
    shadowRadius: 8, //     numbers, as I can't replicate Sketch parameters
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 2 }
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
    alignSelf: "center"
  },
  categoryNameText: {
    color: "rgba(80, 80, 80, 0.5)",
    fontFamily: "Gilroy Extrabold",
    fontSize: 14,
    textTransform: "uppercase"
  },
  signOut: {
    marginLeft: -15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245,218,51, 0.4)",
    height: "100%",
    fontSize: 14
  }
});
