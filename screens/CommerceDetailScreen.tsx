import React, { PropsWithoutRef } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Marker } from "react-native-maps";
import Map from "../components/MapView";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import useCategories from "../hooks/useCategories";
import { Commerce } from "../types";

interface CommerceDetailProps {
  route?: any;
}

export default function CommerceDetailScreen({
  route,
}: PropsWithoutRef<CommerceDetailProps>) {
  const { params } = route;
  const commerce: Commerce = params?.commerce;
  const { categorySelected } = useCategories(commerce.category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{commerce?.name}</Text>
      <Image style={styles.image} source={{ uri: commerce?.img }} />

      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionRow}>
          <Text style={styles.descriptionTitle}>Descripción: </Text>
          <Text style={{ fontWeight: "bold" }}>{categorySelected?.name}</Text>
        </View>
        <View style={styles.separator} />

        {/*  Height of the View component below determines the height of the scroll view. Cannot be defined directly on that component */}
        <View style={styles.descriptionScroll}>
          <ScrollView>
            <Text style={styles.descriptionText}>{commerce?.description}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Map>
          <Marker coordinate={commerce.location} />
        </Map>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "80%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 15,
  },
  title: {
    color: Colors.colors.red[500],
    fontWeight: "bold",
    fontSize: 32,
  },
  descriptionContainer: {
    width: "100%",
    marginBottom: 15,
  },
  descriptionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionScroll: {
    height: 80,
  },
  separator: {
    width: "100%",
    marginVertical: 5,
    height: 3,
    backgroundColor: Colors.colors.gray[200],
    borderRadius: 50,
  },
  descriptionTitle: {
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 14,
  },
  mapContainer: {
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colors.blue[400],
  },
});
