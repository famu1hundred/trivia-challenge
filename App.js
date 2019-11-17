import React from "react";
import { View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
import AppContainer from "./src/config/navigation";
import { StyleProvider } from "native-base";
import store from "./src/redux/store";
import { Provider } from "react-redux";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
  }

  async loadAssets() {
    await Font.loadAsync({
      "NunitoSans": require("./assets/fonts/NunitoSans-Regular.ttf"),
      "NunitoSansBold": require("./assets/fonts/NunitoSans-Bold.ttf"),
      "NunitoSansExtraBold": require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
      "NunitoSansLight": require("./assets/fonts/NunitoSans-Light.ttf"),
    })
  }

  render() {
    if(!this.state.isReady) {
      return (
        <AppLoading startAsync={this.loadAssets}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn} />
      )
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Provider store={store}>
          <View style={{flex: 1}}>
            <AppContainer />
          </View>
        </Provider>
      </StyleProvider>
    )
  }
}
