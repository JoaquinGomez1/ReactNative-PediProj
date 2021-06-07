import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import ListItem from "../../components/ListItem";
import { View } from "../../components/Themed";
import TouchableIcon from "../../components/TouchableIcon";
import Layout from "../../constants/Layout";
import { useProducts } from "../../context/Products";
import IconButton from "../../components/IconButton";
import { BASE_URL } from "../../constants/Common";
import handleNewRequest from "../../libs/handleNewRequest";

export default function ProductListScreen({ navigation }: any) {
  const { productsList, productsFunctions } = useProducts();
  const [localProductList, setLocalProductList] = useState(productsList);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalProductList(productsList);
  }, [productsList]);

  const handleDelete = async (id: number | string) => {
    const req = await fetch(BASE_URL + `/products/${id}`, {
      method: "DELETE",
    });

    if (req.status === 200) {
      // Delete item from the client
      productsFunctions.deleteProductById(id);
      alert("Producto eliminado correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isLoading}
        onRefresh={() =>
          handleNewRequest({
            url: "/products",
            setIsLoading,
            setState: setLocalProductList,
          })
        }
        data={localProductList}
        keyExtractor={(item) => `${item.id}`}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            item={{
              id: item.id,
              img: item.img,
              title: item.title,
              subtitle: `$${item.price}.00`,
              body: `X${item.units}`,
            }}
          >
            <TouchableIcon
              onPress={() =>
                navigation.push("EditProduct", { selectedProduct: item })
              }
              iconName="edit"
              style={{ color: Colors.colors.gray[400] }}
            />
            <TouchableIcon
              onPress={() => handleDelete(item.id)}
              iconName="trash"
              style={{
                color: Colors.colors.red[600],
                marginTop: Layout.spacing[1],
              }}
            />
          </ListItem>
        )}
      />

      <IconButton
        style={styles.addButton}
        textStyle={styles.addButtonText}
        iconStyle={styles.iconStyle}
        iconName="plus"
        displayText={"Agregar Producto"}
        onPress={() => navigation.push("AddProduct")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing[4],
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionsContainer: {},
  addButton: {
    backgroundColor: Colors.colors.green[100],
    borderColor: Colors.colors.green[400],
  },
  addButtonText: {
    color: Colors.colors.green[600],
  },
  iconStyle: {
    color: Colors.colors.green[600],
  },
});
