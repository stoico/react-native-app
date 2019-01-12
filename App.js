import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import FeedSuggestionBox from "./components/FeedSuggestionBox";

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.feedContainer}>
        <FeedSuggestionBox name="Stefano" />
        <FeedSuggestionBox name="Carmine" />
        <FeedSuggestionBox name="Martina" />
        <FeedSuggestionBox name="Rocco" />
        <FeedSuggestionBox name="Angelo" />
        <FeedSuggestionBox name="Marco" />
      </ScrollView>
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
