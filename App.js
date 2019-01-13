import React from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import { LinearGradient } from "expo";

import FeedSuggestionBox from "./components/FeedSuggestionBox";

export default class App extends React.Component {
  openFilmSearchSection = () => {
    console.log("\nJust testing the button\n");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.feedContainer}>
          <FeedSuggestionBox name="Stefano" />
          <FeedSuggestionBox name="Carmine" />
          <FeedSuggestionBox name="Martina" />
          <FeedSuggestionBox name="Rocco" />
          <FeedSuggestionBox name="Angelo" />
          <FeedSuggestionBox name="Marco" />
        </ScrollView>
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            bottom: 50,
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <LinearGradient // colors={["rgba(224, 224, 224, 0)", "#E0E0E0"]}
            colors={["black", "blue"]}
            style={{
              height: 80,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Button
              style={{
                flex: 1,
                borderRadius: 35,
                margin: "0 auto",
                backgroundColor: "#2EA6FF"
              }}
              onPress={this.openFilmSearchSection.bind(this)}
              title="Learn More"
              color="white"
              accessibilityLabel="Learn more about this purple button"
            />
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedContainer: {
    marginTop: 90,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 30
  }
});
