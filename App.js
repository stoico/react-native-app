import React from "react";
import { View, Text } from "react-native";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
// import { Font, AppLoading } from "expo";

import HomeScreen from "./screens/HomeScreen";
import FilmScreen from "./screens/FilmScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import RankingScreen from "./screens/RankingScreen";
import FriendsListScreen from "./screens/FriendsListScreen";
import FriendScreen from "./screens/FriendScreen";
import SuggestScreen from "./screens/SuggestScreen";
import SuggestedScreen from "./screens/SuggestedScreen";

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Film: FilmScreen,
//     MyProfile: MyProfileScreen
//   },
//   {
//     initialRoute: "Home"
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: "absolute",
              right: -6,
              top: -3,
              backgroundColor: "red",
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === "Home") {
    iconName = `ios-albums`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === "MyProfile") {
    iconName = `ios-happy`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  Home: {
    screen: SuggestScreen,
    navigationOptions: {
      header: null
    }
  },
  Film: {
    screen: FilmScreen,
    navigationOptions: {
      header: null
    }
  },
  Suggest: {
    screen: SuggestScreen,
    navigationOptions: {
      header: null
    }
  }
});

const RankingStack = createStackNavigator({
  Ranking: {
    screen: RankingScreen,
    navigationOptions: {
      header: null
    }
  },
  Film: {
    screen: FilmScreen,
    navigationOptions: {
      header: null
    }
  }
});

const ProfileStack = createStackNavigator({
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  FriendsList: {
    screen: FriendsListScreen,
    navigationOptions: {
      header: null
    }
  }
});

const TabNavigator = createBottomTabNavigator(
  { Home: HomeStack, Ranking: RankingStack, Profile: ProfileStack },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-albums`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === "Ranking") {
          iconName = `ios-star`;
        } else if (routeName === "Profile") {
          iconName = `ios-happy`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#2EA6FF",
      inactiveTintColor: "rgba(80, 80, 80, 0.8)",
      showLabel: false,
      style: {
        backgroundColor: "#FFFFFF",
        borderTopColor: "#FFFFFF" // or transparent
      }
      // labelStyle: {
      //   fontFamily: "Gilroy Light"
      // }
    }
  }
);

// class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

export default createAppContainer(TabNavigator);
