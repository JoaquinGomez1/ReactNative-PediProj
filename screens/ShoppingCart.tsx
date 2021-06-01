import React from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "../components/Themed";
import ProductComponent from "../components/Product";
import { useCart } from "../context/Cart";
import MyButton from "../components/Button";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const PRODUCT_HEIGHT = 300;

export default function ShoppingCart({ navigation, route }: any) {
  const { cart, cartFunctions } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cart?.length} productos en la cesta</Text>

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces
        keyExtractor={({ id }) => `${id}`}
        style={{ width: "80%" }}
        renderItem={({ item }) => (
          <ProductComponent
            key={item.id}
            onSwipeLeft={() => cartFunctions.deleteFromCart(item.id)}
            style={styles.card}
            navigation={navigation}
            product={item}
            route={route}
          >
            <Text style={styles.quantity}>Cantidad: {item.units}</Text>
          </ProductComponent>
        )}
      />

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: Colors.colors.gray[200],
          borderTopWidth: 1,
        }}
      >
        <View>
          <Text style={styles.total}>
            Total: ${cartFunctions.getCartTotal()}.00
          </Text>
        </View>
        <MyButton
          altStyle
          title="Limpiar cesta"
          onPress={() => cartFunctions.clearCart()}
        />
        <MyButton
          title="Comprar productos"
          onPress={() => alert("Esperando implementacion")}
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
    height: PRODUCT_HEIGHT,
    paddingHorizontal: Layout.spacing[1],
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.colors.gray[600],
  },
  quantity: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.colors.gray[600],
  },
});
