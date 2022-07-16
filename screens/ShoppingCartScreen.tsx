import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "../components/Themed";
import ProductComponent from "../components/Product";
import { useCart } from "../context/Cart";
import MyButton from "../components/Button";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import TouchableIcon from "../components/TouchableIcon";
import { input } from "../constants/Styles";
import MyModal from "../components/Modal";
import { Customer_Order } from "../types";
import { useCurrentUser } from "../context/User";
import handleNewRequest from "../libs/handleNewRequest";

export default function ShoppingCartScreen({ navigation, route }: any) {
  const { cart, cartFunctions } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState<string>("");
  const { currentUser } = useCurrentUser();

  const [customerOrder] = useState<Customer_Order | undefined>({
    products: [...cart],
    orderData: {
      customerName: currentUser?.displayName! || "default name",
      email: currentUser?.email!,
      address,
      total: cartFunctions.getCartTotal(),
    },
  });

  const handleFormSubmit = () => {
    const orderCopy = { ...customerOrder };
    if (orderCopy.orderData) orderCopy.orderData.address = address;

    handleNewRequest({
      url: "/orders",
      fetchOptions: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderCopy),
      },
    }).then(() => {
      alert("Tu compra ha sido aceptada correctamente");
      cartFunctions.clearCart();
      setModalOpen(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cart?.length} productos en la cesta</Text>
      <MyModal
        modalVisible={modalOpen}
        onExitRequest={() => setModalOpen(false)}
      >
        <Text>Antes de terminar necesitamos un último detalle:</Text>
        <TextInput
          onChangeText={(text) => setAddress(text)}
          style={input}
          placeholder="Direccion"
        />
        <Text>Total: ${cartFunctions.getCartTotal()}.00</Text>
        <Text>Cantidad de productos: {cart.length}</Text>
        <View>
          <MyButton title="Comprar" onPress={handleFormSubmit} />
        </View>
      </MyModal>
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
          onPress={() => setModalOpen(true)}
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
