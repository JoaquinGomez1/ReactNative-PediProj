import React, { PropsWithRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Category as CategoryType } from "../types";
import ProductImage from "./ProductImage";
import { Text, View } from "./Themed";

interface CategoryProp {
  handleNavigation: () => void;
  category: CategoryType;
  children?: React.ReactNode;
}

export default function Commerce({
  handleNavigation,
  category,
  children,
  ...rest
}: PropsWithRef<CategoryProp>) {
  return (
    <View {...rest} style={styles.container}>
      <TouchableOpacity style={styles.pressableArea} onPress={handleNavigation}>
        <ProductImage source={{ uri: category?.img }} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category?.name || "Category"}</Text>
        </View>
      </TouchableOpacity>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 350,
    width: "90%",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.colors.borders,
    marginVertical: 8,
  },
  title: {
    color: Colors["light"].text,
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    height: 40,
    width: "100%",
  },
  pressableArea: {
    width: "100%",
  },
});
