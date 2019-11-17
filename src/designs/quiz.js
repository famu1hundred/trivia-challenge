import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const quiz = () => (
  <View style={styles.container}>
    <Text>Entertainment: Video Games</Text>
    <View style={styles.box}>
      <Text>Unturned originally started as a Roblox game.</Text>
    </View>
    <Text>1 of 10</Text>
    <TouchableOpacity style={styles.button}>
      <Text>True</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text>False</Text>
    </TouchableOpacity>
  </View>
);

export default quiz;
