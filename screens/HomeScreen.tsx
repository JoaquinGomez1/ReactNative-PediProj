import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import cartContext from "../context/Cart";
import { CartState } from "../types";
import { productList as initialData } from "../constants/MockData";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import UserContext from "../context/User";
import CurrentUserAvatar from "../components/CurrentUserAvatar";
import useInitialFetch from "../hooks/useInitialFetch";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import { useProducts } from "../context/Products";

export default function TabOneScreen({ navigation, route }: any) {
  const { cartFunctions } = useContext<CartState>(cartContext);
  const { currentUser } = useContext(UserContext);
  // const { data, isLoading } = useInitialFetch("/products");
  const { productsList } = useProducts();
  const [localProductList, setLocalProductList] = useState(initialData);

  const handleSearchTextChange = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = productsList.filter((each) => regex.test(each.title));
    setLocalProductList(filteredList);
  };

  // React.useEffect(() => {
  //   setLocalProductList(productsList);
  // }, [productsList]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedi-Proj</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.subheader}>
          <Text style={styles.subheaderText}>
            Hola. {currentUser?.displayName || currentUser?.email}
          </Text>
          <CurrentUserAvatar />
        </View>
        <View style={{ width: "100%", marginVertical: 20 }}>
          <SearchBar
            placeholder="Buscar en destacados"
            onChangeText={handleSearchTextChange}
          />
        </View>
        <Text style={styles.highlightedProducts}>Productos destacados</Text>
        <View style={styles.separator} />
        {
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {localProductList?.length <= 0 ? (
              <Text style={styles.notFound}>No se encontraron productos</Text>
            ) : (
              localProductList?.map((each) => (
                <Product
                  navigation={navigation}
                  product={each}
                  key={`${each?.id}`}
                  onSwipeRight={() => cartFunctions.addToCart(each)}
                  route={route}
                >
                  <MyButton
                    style={{ width: "100%" }}
                    title="Agregar a carrito"
                    onPress={() => cartFunctions.addToCart(each)}
                  />
                </Product>
              ))
            )}
          </ScrollView>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: Layout.spacing[4],
    flex: 1,
  },
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
    width: "100%",
    height: 2,
    backgroundColor: Colors.colors.gray[200],
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
