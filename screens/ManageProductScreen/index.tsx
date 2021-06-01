import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListItem from "../../components/ListItem";
import { Text, View } from "../../components/Themed";
import TouchableIcon from "../../components/TouchableIcon";
import { Product } from "../../types";
import ProductForm from "../../components/FormAddProduct";
import Layout from "../../constants/Layout";
import { useProducts } from "../../context/Products";
import Icon from "../../components/DefaultIcon";
import IconButton from "../../components/IconButton";

export default function ProductListScreen({ navigation }: any) {
  const { productsList, productsFunctions } = useProducts();
  const [selectedProductId, setSelectedProductId] =
    useState<number | string | undefined>();

  const [showAddButton, setShowAddButton] = useState(true);
  const [selectedProductData, setSelectedProductData] =
    useState<Product | undefined>();

  useEffect(() => {
    const selected = productsList.find((each) => each.id === selectedProductId);
    setSelectedProductData(selected);
    if (selectedProductId) {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
    }
  }, [selectedProductId]);

  return (
    <View style={styles.container}>
      {!selectedProductData && (
        <FlatList
          data={productsList}
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
                onPress={() => productsFunctions.deleteProductById(id)}
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
              onSubmit={() => undefined}
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
          displayText="Agregar Producto"
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
    backgroundColor: Colors.colors.red[400],
    borderColor: Colors.colors.red[600],
  },
  addButtonText: {
    color: Colors.colors.gray[600],
  },
  iconStyle: {
    color: Colors.colors.red[600],
  },
});
