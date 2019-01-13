import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
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
          <LinearGradient
            colors={["black", "blue"]} // colors={["rgba(224, 224, 224, 0)", "#E0E0E0"]}
            style={{
              height: 80,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            {/* Button */}
            <View
              style={{
                flex: 1,
                height: 60,
                borderRadius: 35,
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: "#2EA6FF",
                color: "#F8F8F8"
              }}
              onPress={this.openFilmSearchSection.bind(this)}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  color: "#F8F8F8"
                }}
              >
                Consiglia serie TV o film
              </Text>
            </View>
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
