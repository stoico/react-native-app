import React from "react";
import { View, Button, Text } from "react-native";

export default class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Mio Profilo",
    headerStyle: { backgroundColor: "#2EA6FF" },
    headerTintColor: "white",
    headerTitleStyle: { fontWeight: "600" }
  };

  render() {
    const { navigation } = this.props;
    const filmID = navigation.getParam("filmID", 1);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>Film ID: {JSON.stringify(filmID)}</Text>
      </View>
    );
  }
}
