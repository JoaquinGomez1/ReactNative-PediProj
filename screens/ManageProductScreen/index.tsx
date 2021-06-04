import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import ListItem from "../../components/ListItem";
import { Text, View } from "../../components/Themed";
import TouchableIcon from "../../components/TouchableIcon";
import { Product } from "../../types";
import ProductForm from "../../components/FormAddProduct";
import Layout from "../../constants/Layout";
import { useProducts } from "../../context/Products";
import IconButton from "../../components/IconButton";
import { BASE_URL } from "../../constants/Common";
import handleNewRequest from "../../libs/handleNewRequest";

export default function ProductListScreen({ navigation }: any) {
  const { productsList, productsFunctions } = useProducts();
  const [requestStarted, setRequestStarted] = useState<boolean>(false);
  const [localProductList, setLocalProductList] = useState(productsList);
  const [isLoading, setIsLoading] = useState(false);

  const [showAddButton, setShowAddButton] = useState(true);

  const [selectedProductId, setSelectedProductId] =
    useState<number | string | undefined>();
  const [selectedProductData, setSelectedProductData] =
    useState<Product | undefined>();

  useEffect(() => {
    // Sets selected data and toggles Add button
    const selected = localProductList.find(
      (each) => each.id === selectedProductId
    );
    setSelectedProductData(selected);
    setShowAddButton(!selectedProductId);
  }, [selectedProductId]);

  useEffect(() => {
    setLocalProductList(productsList);
  }, [productsList]);

  const handleSubmit = async (editedProduct: Product) => {
    // Edited product gets passed by the FormProduct component
    setRequestStarted(true);
    const req = await fetch(BASE_URL + "/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });

    if (req.status === 200) {
      alert("Producto actualizado correctamente");
    }
    setRequestStarted(false);
  };

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
      {!selectedProductData && (
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
          renderItem={({ item: { title, img, units, price, id } }) => (
            <ListItem
              item={{
                title,
                id,
                img,
                subtitle: `$${price}.00`,
                body: `X${units}`,
              }}
            >
              <TouchableIcon
                onPress={() => setSelectedProductId(id)}
                iconName="edit"
                style={{ color: Colors.colors.gray[400] }}
              />
              <TouchableIcon
                onPress={() => handleDelete(id)}
                iconName="trash"
                style={{
                  color: Colors.colors.red[600],
                  marginTop: Layout.spacing[1],
                }}
              />
            </ListItem>
          )}
        />
      )}

      {selectedProductData && (
        <View style={{ width: "100%" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <TouchableIcon
                style={{ marginLeft: Layout.spacing[1] }}
                iconName="arrow-left"
                onPress={() => setSelectedProductId(undefined)}
              />
              <Text style={{ marginLeft: 50, fontSize: 16 }}>
                Editar: {selectedProductData?.title}
              </Text>
            </View>
            <ProductForm
              buttonDisabled={requestStarted}
              buttonTitle={requestStarted ? "Procesando..." : "Editar producto"}
              onSubmit={handleSubmit}
              productData={selectedProductData}
            />
          </ScrollView>
        </View>
      )}

      {showAddButton && (
        <IconButton
          style={styles.addButton}
          textStyle={styles.addButtonText}
          iconStyle={styles.iconStyle}
          iconName="plus"
          displayText={"Agregar Producto"}
          onPress={() => navigation.push("AddProduct")}
        />
      )}
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
