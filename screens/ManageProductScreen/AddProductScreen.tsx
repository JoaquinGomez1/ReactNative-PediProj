import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import ProductForm from "../../components/FormAddProduct";
import Layout from "../../constants/Layout";
import { BASE_URL } from "../../constants/Common";
import { Product } from "../../types";

export default function AddProductScreen({ navigation }: any) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleAddProduct = async (newProductData: Product) => {
    setIsFetching(true);
    const req = await fetch(BASE_URL + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    });
    if (req.status === 200) {
      alert("Producto agregado correctamente");
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
        <Text style={styles.title}>Agregar producto</Text>

        <View style={{ width: "100%" }}>
          <ProductForm
            buttonDisabled={isFetching}
            buttonTitle={isFetching ? "Procesando..." : "Agregar producto"}
            onSubmit={handleAddProduct}
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
