import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import ProductComponent from "../components/Product";
import cartContext from "../context/Cart";
import { Product, State } from "../types";
import MyButton from "../components/Button";

export default function ShoppingCart({ navigation }: any) {
  const { cart, cartFunctions } = useContext<State>(cartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cart?.length} Item/s in cart</Text>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {cart?.length >= 1 &&
          cart?.map((product: Product, i: number) => (
            <ProductComponent
              style={styles.card}
              key={product?.id + i}
              navigation={navigation}
              product={product}
            >
              <MyButton
                title="Delete"
                onPress={() => cartFunctions.deleteFromCart(product.id)}
              />
            </ProductComponent>
          ))}
      </ScrollView>
      <MyButton title="Clear cart" onPress={() => cartFunctions.clearCart()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  card: {
    marginVertical: 8,
  },
});
