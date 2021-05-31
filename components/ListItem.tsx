import React, { PropsWithChildren } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { mockProduct } from "../constants/MockData";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

interface Item {
  id: string | number;
  img: string;
  title: string | number;
  subtitle: string | number;
  body: string | number;
}

interface ListItemProps {
  item: Item;
}

export default function ListItem({
  children,
  item,
}: PropsWithChildren<ListItemProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: item.img }}
        />
        <View>
          <Text style={styles.small}>Id: {item.id}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>${item.subtitle}.00</Text>
          <Text style={{ position: "absolute", bottom: 0 }}>X{item.body}</Text>
        </View>
        <View style={styles.actionsContainer}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.colors.gray[200],
    borderRadius: 5,
    padding: 5,
    minHeight: 80,
    shadowColor: Colors.colors.gray[300],
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginVertical: 5,
    elevation: 3,
  },
  flex: {
    flexDirection: "row",
  },
  image: {
    height: 80,
    width: 90,
    marginRight: Layout.spacing[1],
  },
  title: {
    fontSize: 18,
    color: Colors.colors.red[400],
  },
  subtitle: {
    fontSize: 16,
  },
  small: { fontSize: 11 },
  actionsContainer: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -25 }],
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
