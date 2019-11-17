import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Register from "../screens/register";
import Quiz from "../screens/quiz";
import Results from "../screens/results";


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Register: Register,
    Quiz: Quiz,
    Results: Results
  },
  { initialRouteName: "Home", headerMode: "none" }
);

export default createAppContainer(AppNavigator);
