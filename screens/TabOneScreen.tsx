import * as React from "react";
import { useContext } from "react";
import { Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Product from "../components/Product";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import cartContext from "../context/Cart";
import { State } from "../types";

const mockProduct = {
  img: "https://m.media-amazon.com/images/I/61OL2zIliML._AC_UY218_.jpg",
  description:
    "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
  title: "Playstation",
  id: 123,
  units: 10,
  price: 360,
};

export default function TabOneScreen({ navigation }: any) {
  const { cartFunctions } = useContext<State>(cartContext);

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
          <Product navigation={navigation} product={mockProduct}>
            <MyButton
              title="Add To Cart"
              onPress={() => cartFunctions.addToCart(mockProduct)}
            />
          </Product>
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
