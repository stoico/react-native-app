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
            // colors={["black", "blue"]}
            colors={["rgba(224, 224, 224, 0)", "#E0E0E0"]}
            style={{
              height: 85,
              justifyContent: "center",
              alignContent: "center",
              paddingTop: 7,
              paddingRight: 36,
              paddingLeft: 36,
              paddingBottom: 18
            }}
          >
            {/* Button */}
            <View
              style={
                {
                  flex: 1,
                  height: 60,
                  borderRadius: 35,
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: "#2EA6FF",
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  shadowColor: "#2EA6FF",
                  shadowOffset: { width: 0, height: 4 }
                } // made up this //     numbers, as I can't replicate Sketch parameters
              }
              onPress={this.openFilmSearchSection.bind(this)}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  color: "#F8F8F8",
                  fontSize: 20
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
