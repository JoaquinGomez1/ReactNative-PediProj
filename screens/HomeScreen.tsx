import * as React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Product from "../components/Product";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import cartContext from "../context/Cart";
import { CartState } from "../types";
import { productList } from "../constants/MockData";
import GestureRecognizer from "react-native-swipe-gestures";

export default function TabOneScreen({ navigation }: any) {
  const { cartFunctions } = useContext<CartState>(cartContext);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Pedi-Proj</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.container}>
        <Text style={styles.body}>Realiza pedidos de tus cosas favoritas</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          {productList.map((each) => (
            <GestureRecognizer
              key={each.id}
              onSwipeRight={() => cartFunctions.addToCart(each)}
            >
              <Product navigation={navigation} product={each}>
                <MyButton
                  title="Add To Cart"
                  onPress={() => cartFunctions.addToCart(each)}
                />
              </Product>
            </GestureRecognizer>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 30, alignItems: "center" },
  container: {
    flex: 1, // Use full screen
    alignItems: "center",
  },
  scrollView: {
    flex: 1, // Use full screen
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 15,
    color: Colors.colors.red[400],
  },
  separator: {
    marginVertical: 10,
    backgroundColor: "white",
    opacity: 0.4,
    height: 1,
    width: "80%",
  },
  body: {
    fontSize: 16,
    marginBottom: 26,
  },
});
