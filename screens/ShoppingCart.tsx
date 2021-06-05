import React from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "../components/Themed";
import ProductComponent from "../components/Product";
import { useCart } from "../context/Cart";
import MyButton from "../components/Button";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import TouchableIcon from "../components/TouchableIcon";

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
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => (
          <ProductComponent
            key={item.id}
            onSwipeLeft={() => cartFunctions.deleteFromCart(item.id)}
            style={styles.card}
            navigation={navigation}
            product={item}
            route={route}
          >
            <View style={styles.actionsContainer}>
              <TouchableIcon
                onPress={() =>
                  cartFunctions.setProductQuantity(item.units - 1, item.id)
                }
                iconName="minus"
              />
              <Text style={styles.quantity}>Cantidad: {item.units}</Text>
              <TouchableIcon
                onPress={() => {
                  cartFunctions.setProductQuantity(item.units + 1, item.id);
                }}
                iconName="plus"
              />
            </View>
          </ProductComponent>
        )}
      />

      <View style={styles.cartActions}>
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
          disabled={cart.length < 1}
          onPress={() => alert("Esperando implementacion")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing[4],
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  card: {
    marginVertical: 8,
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
    marginHorizontal: Layout.spacing[3],
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartActions: {
    width: "100%",
    paddingVertical: 10,
    borderColor: Colors.colors.gray[200],
    borderTopWidth: 1,
  },
});
