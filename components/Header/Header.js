import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Font, AppLoading } from "expo";

import HeaderSection from "./HeaderSection";

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <HeaderSection
          pageTitle={this.props.pageTitle}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    );
  }
}
