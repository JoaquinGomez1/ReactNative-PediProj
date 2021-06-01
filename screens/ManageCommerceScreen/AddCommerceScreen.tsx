import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import Layout from "../../constants/Layout";
import FormCommerce from "../../components/FormCommerce";

export default function AddCommerceScreen({ navigation }: any) {
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
        <Text style={styles.title}>Agregar Comercio</Text>

        <View style={{ width: "100%" }}>
          <FormCommerce onSubmit={() => undefined} />
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
