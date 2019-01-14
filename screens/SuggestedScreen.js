import React from "react";
import { View, TextInput, Text } from "react-native";

export default class SuggestedScreen extends React.Component {
  static navigationOptions = {
    title: "Suggested",
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
        <Text>Input Screen</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "grey",
            borderWidth: 2,
            width: "60%"
          }}
          placeholder="Type here to translate!"
          onChangeText={text => this.setState({ text })}
        />
        <Text>{this.state.text || " "}</Text>
      </View>
    );
  }
}
