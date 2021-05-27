import React, { PropsWithoutRef, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Marker } from "react-native-maps";
import Loader from "../components/Loader";
import Map from "../components/MapView";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import { categoriesList } from "../constants/MockData";
import { Category, Commerce } from "../types";

interface CommerceDetailProps {
  route?: any;
}

type DefaultCategory = {
  name: string;
};

function determineCategory(id: string | number): Category | DefaultCategory {
  const foundCategory = categoriesList.find((each) => each.id === id);
  if (foundCategory) return foundCategory;

  return { name: "Not found" };
}

export default function CommerceDetailScreen({
  route,
}: PropsWithoutRef<CommerceDetailProps>) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [category, setCategory] = useState<DefaultCategory | Category>({
    name: "Default",
  });
  const { params } = route;
  const commerce: Commerce = params?.commerce;

  useEffect(() => {
    const categoryOfCommerce = determineCategory(commerce.category);
    setCategory(categoryOfCommerce);
    setIsPageLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.title}>{commerce?.name}</Text>
          <Image style={styles.image} source={{ uri: commerce?.img }} />

          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionRow}>
              <Text style={styles.descriptionTitle}>Descripción</Text>
              <Text style={{ fontWeight: "bold" }}>{category?.name}</Text>
            </View>
            <View style={styles.separator} />

            {/*  Height of the View component below determines the height of the scroll view. Cannot be defined directly on that component */}
            <View style={styles.descriptionScroll}>
              <ScrollView>
                <Text style={styles.descriptionText}>
                  {commerce?.description}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Map>
              <Marker coordinate={commerce.location} />
            </Map>
          </View>
        </>
      )}
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
    fontSize: 22,
  },
  descriptionText: {
    fontSize: 16,
  },
  mapContainer: {
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colors.blue[400],
  },
});
