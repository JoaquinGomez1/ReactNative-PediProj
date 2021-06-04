import * as React from "react";
import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import { useCart } from "../context/Cart";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import { useCurrentUser } from "../context/User";
import CurrentUserAvatar from "../components/CurrentUserAvatar";
import Loader from "../components/Loader";
import Layout from "../constants/Layout";
import useInitialFetch from "../hooks/useInitialFetch";
import handleNewRequest from "../libs/handleNewRequest";

export default function TabOneScreen({ navigation, route }: any) {
  const { cartFunctions } = useCart();
  const { currentUser } = useCurrentUser();
  const {
    data: productsList,
    isLoading,
    setIsLoading,
  } = useInitialFetch("/products");
  const [localProductList, setLocalProductList] = useState(productsList);

  const handleSearchTextChange = (text: string) => {
    const regex = new RegExp(text, "gi");
    const filteredList = productsList.filter((each: any) =>
      regex.test(each.title)
    );
    setLocalProductList(filteredList);
  };

  React.useEffect(() => {
    setLocalProductList(productsList);
  }, [productsList]);

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
        {isLoading ? (
          <Loader />
        ) : (
          <View>
            {localProductList?.length <= 0 ? (
              <Text style={styles.notFound}>No se encontraron productos</Text>
            ) : (
              <FlatList
                refreshing={isLoading}
                onRefresh={() =>
                  handleNewRequest({
                    setIsLoading,
                    setState: setLocalProductList,
                    url: "/products",
                  })
                }
                data={localProductList}
                keyExtractor={({ id }) => `${id}`}
                style={[styles.scrollView]}
                renderItem={({ item }) => (
                  <Product
                    navigation={navigation}
                    product={item}
                    key={`${item?.id}`}
                    onSwipeRight={() => cartFunctions.addToCart(item)}
                    route={route}
                  >
                    <MyButton
                      style={{ width: "100%" }}
                      title="Agregar a carrito"
                      onPress={() => cartFunctions.addToCart(item)}
                    />
                  </Product>
                )}
              />
            )}
          </View>
        )}
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
    flex: 1,
    maxHeight: "85%",
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
