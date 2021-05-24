import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import ProductComponent from "../components/Product";
import { useCart } from "../context/Cart";
import { Product } from "../types";
import MyButton from "../components/Button";
import Colors from "../constants/Colors";

export default function ShoppingCart({ navigation, route }: any) {
  const { cart, cartFunctions } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cart?.length} Item/s in cart</Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {cart?.length >= 1 &&
          cart?.map((product: Product, i: number) => (
            <ProductComponent
              onSwipeLeft={() => cartFunctions.deleteFromCart(product.id)}
              style={styles.card}
              navigation={navigation}
              product={product}
              route={route}
            ></ProductComponent>
          ))}
      </ScrollView>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          borderColor: Colors.colors.gray[200],
          borderTopWidth: 1,
        }}
      >
        <MyButton
          title="Clear cart"
          onPress={() => cartFunctions.clearCart()}
        />
      </View>
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
