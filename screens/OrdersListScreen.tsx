import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Icon from "../components/DefaultIcon";
import Loader from "../components/Loader";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useInitialFetch from "../hooks/useInitialFetch";
import { Customer_Order } from "../types";

export default function OrdersListScreen() {
  const {
    data,
    isLoading,
  }: { data: Array<Customer_Order>; isLoading: boolean } =
    useInitialFetch("/customerOrders");

  return (
    <View style={styles.container}>
      {!isLoading && (
        <FlatList
          data={data}
          style={{ width: "100%", maxHeight: 750 }}
          keyExtractor={({ orderData }) => `${orderData.id}`}
          renderItem={({ item: { orderData, products } }) => (
            <View style={styles.orderCardContainer}>
              <View style={styles.rowContainer}>
                <Icon
                  style={[styles.icon, { color: Colors.colors.red[400] }]}
                  iconName="user"
                />
                <Text style={styles.cardTitle}>{orderData?.customerName}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon style={styles.icon} iconName="envelope" />
                <Text style={styles.cardSubtitle}>{orderData?.email}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon
                  style={[styles.icon, { width: 26 }]}
                  iconName="map-marker-alt"
                />
                <Text style={styles.cardSubtitle}>{orderData?.address}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon style={styles.icon} iconName="hand-holding-usd" />
                <Text style={styles.cardSubtitle}>${orderData?.total}.00</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon style={styles.icon} iconName="shopping-cart" />
                <Text style={styles.cardProducts}>{products?.length}</Text>
              </View>
            </View>
          )}
        />
      )}

      {isLoading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Loader />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.spacing[4],
  },
  title: {
    fontSize: 20,
  },
  orderCardContainer: {
    width: "100%",
    paddingVertical: Layout.spacing[1],
    paddingHorizontal: Layout.spacing[2],
    borderWidth: 1,
    borderColor: Colors.colors.gray[200],
    borderRadius: 5,
    marginVertical: Layout.spacing[1],
    elevation: 4,
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: 2,
  },
  icon: {
    marginRight: Layout.spacing[2],
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.colors.red[500],
  },
  cardSubtitle: {},
  cardProducts: {},
});
