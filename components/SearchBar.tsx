import { Ionicons } from "@expo/vector-icons";
import React, { PropsWithoutRef } from "react";
import { Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { View } from "./Themed";

interface SearchBarProps {
  onChangeText: (text: string) => void;
  placeholder: string;
}

export default function SearchBar(props: PropsWithoutRef<SearchBarProps>) {
  return (
    <View style={styles.barContainer}>
      <View style={{ paddingHorizontal: 15, overflow: "scroll" }}>
        <Ionicons name="search" size={24} />
      </View>
      <TextInput
        onChangeText={(text) => props.onChangeText(text)}
        numberOfLines={1}
        style={{ width: "80%", overflow: "scroll", zIndex: 0 }}
        placeholder={props.placeholder || "Buscar"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.colors.gray[200],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
