import * as React from "react";
import { StyleSheet } from "react-native";
import { useContext } from "react";

import { Text, View } from "../components/Themed";
import { Product } from "../types";
import ProductImage from "../components/ProductImage";
import Button from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import cartContext from "../context/Cart";

export default function ProductDetail({ route, navigation }: any) {
  const productId = route?.params?.id;
  const product: Product = route?.params?.product;
  const { cartFunctions } = useContext(cartContext);

  if (!productId || !Object.keys(product))
    navigation.navigate("Home", { screen: "Home" });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <ProductImage source={{ uri: product?.img }} />

      <View style={styles.priceArea}>
        <Text style={styles.price}>$ {product.price}.00</Text>
        <Text>{product.units} unidades</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <View style={styles.separator} />

        <View style={styles.descriptionArea}>
          <Text>{product.description}</Text>
        </View>
      </ScrollView>

      <Button
        title="Add to cart"
        onPress={() => cartFunctions.addToCart(product)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 60,
  },
  separator: {
    width: "100%",
    backgroundColor: "#b3b3b3",
    height: 1,
    marginVertical: 15,
  },
  descriptionTitle: {
    fontSize: 16,
  },
  descriptionArea: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
  },
  price: {
    fontSize: 32,
  },
  priceArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
