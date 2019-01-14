import React from "react";
import { View, Text } from "react-native";

export default class SuggestScreen extends React.Component {
  static navigationOptions = {
    title: "Suggest",
    headerStyle: { backgroundColor: "#2EA6FF" },
    headerTintColor: "white",
    headerTitleStyle: { fontWeight: "600" }
  };

  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  render() {
    const { navigation } = this.props;
    const filmID = navigation.getParam("filmID", 1);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Suggest Screen</Text>
        <Text>{filmID}</Text>
      </View>
    );
  }
}
