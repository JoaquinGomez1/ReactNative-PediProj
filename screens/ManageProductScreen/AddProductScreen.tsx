import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import MyButton from "../../components/Button";
import ProductForm from "../../components/FormAddProduct";
import TouchableIcon from "../../components/TouchableIcon";
import { blankProduct } from "../../constants/MockData";
import Layout from "../../constants/Layout";

export default function AddProductScreen({ navigation }: any) {
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
          <ProductForm onSubmit={() => undefined} productData={blankProduct} />
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
