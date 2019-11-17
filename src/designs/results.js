import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons'";
import styles from "./styles";
import data from "./data.json";

const render = ({ item }) => (
  <React.Fragment>
    <AntDesign name="checkcircle" size={32} color="green" />
    <Text>{item.question}</Text>
  </React.Fragment>
);

const results = () => (
  <View style={styles.container}>
    <Text>You scored</Text>
    <Text>3/10</Text>
    <FlatList data={data} renderItem={render} />
    <TouchableOpacity style={styles.button}>
      <Text>PLAY AGAIN?</Text>
    </TouchableOpacity>
  </View>
);

export default results;
