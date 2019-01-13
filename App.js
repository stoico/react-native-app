import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import FilmScreen from "./screens/FilmScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Film: FilmScreen
  },
  {
    initialRoute: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
