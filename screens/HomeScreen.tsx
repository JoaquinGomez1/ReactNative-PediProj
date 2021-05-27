import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import cartContext from "../context/Cart";
import { CartState } from "../types";
import { productList as mockList } from "../constants/MockData";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import UserContext from "../context/User";
import CurrentUserAvatar from "../components/CurrentUserAvatar";

export default function TabOneScreen({ navigation, route }: any) {
  const { cartFunctions } = useContext<CartState>(cartContext);
  const { currentUser } = useContext(UserContext);
  const [productList, setProductList] = useState(mockList);

  const handleSearchTextChange = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = mockList.filter((each) => regex.test(each.title));
    setProductList(filteredList);
  };

  return (
    <View style={{ paddingHorizontal: 30, flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedi-Proj</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.container}>
        <View style={styles.subheader}>
          <Text style={styles.subheaderText}>Hola. {currentUser?.email}</Text>
          <CurrentUserAvatar />
        </View>
        <View style={{ width: "100%", marginVertical: 20 }}>
          <SearchBar
            placeholder="Buscar en destacados"
            onChangeText={handleSearchTextChange}
          />
        </View>
        <Text style={styles.highlightedProducts}>Productos destacados</Text>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: Colors.colors.gray[200],
          }}
        ></View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {productList?.length <= 0 ? (
            <Text style={styles.notFound}>No se encontraron productos</Text>
          ) : (
            productList.map((each) => (
              <Product
                navigation={navigation}
                product={each}
                key={`${each.id}`}
                onSwipeRight={() => cartFunctions.addToCart(each)}
                route={route}
              >
                <MyButton
                  title="Agregar a carrito"
                  onPress={() => cartFunctions.addToCart(each)}
                />
              </Product>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 40, alignItems: "center" },
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
  subheaderText: {
    fontSize: 17,
    fontWeight: "600",
  },
  subheader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
  },
  highlightedProducts: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  notFound: {
    color: Colors.colors.red[500],
    fontSize: 25,
    textAlign: "center",
  },
});
