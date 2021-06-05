import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import ProductForm from "../../components/FormAddProduct";
import { blankProduct } from "../../constants/MockData";
import Layout from "../../constants/Layout";
import { BASE_URL } from "../../constants/Common";
import { Product } from "../../types";

export default function EditProductScreen({ route }: any) {
  const { selectedProduct }: { selectedProduct: Product } = route.params;
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = async (editedProduct: Product) => {
    // Edited product gets passed by the FormProduct component
    setIsFetching(true);
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
    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Editar: {selectedProduct?.title}</Text>

        <View style={{ width: "100%" }}>
          <ProductForm
            buttonDisabled={isFetching}
            buttonTitle={isFetching ? "Procesando..." : "Agregar producto"}
            onSubmit={handleSubmit}
            productData={selectedProduct}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: Layout.spacing[2],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
