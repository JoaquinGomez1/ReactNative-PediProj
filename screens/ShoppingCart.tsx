import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import ProductComponent from "../components/Product";
import { useCart } from "../context/Cart";
import MyButton from "../components/Button";
import Colors from "../constants/Colors";

const PRODUCT_HEIGHT = 300;

export default function ShoppingCart({ navigation, route }: any) {
  const { cart, cartFunctions } = useCart();
  const cartWithFiller = [...cart, { id: "filler-bottom" }];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cart?.length} productos en la cesta</Text>

      <FlatList
        data={cartWithFiller}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces
        keyExtractor={({ id }) => `${id}`}
        style={{ width: "70%" }}
        snapToInterval={PRODUCT_HEIGHT}
        renderItem={({ item }) =>
          item.id === "filler-bottom" ? (
            <View style={{ height: PRODUCT_HEIGHT / 2 }}></View>
          ) : (
            <ProductComponent
              key={item.id}
              onSwipeLeft={() => cartFunctions.deleteFromCart(item.id)}
              style={styles.card}
              navigation={navigation}
              product={item}
              route={route}
            />
          )
        }
      />

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          borderColor: Colors.colors.gray[200],
          borderTopWidth: 1,
        }}
      >
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
  },
});
