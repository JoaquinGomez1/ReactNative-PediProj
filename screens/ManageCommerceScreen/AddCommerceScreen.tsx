import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import Layout from "../../constants/Layout";
import FormCommerce from "../../components/FormCommerce";
import { Commerce } from "../../types";
import { BASE_URL } from "../../constants/Common";

export default function AddCommerceScreen({ navigation }: any) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleAddCommerce = async (newCommerce: Commerce) => {
    setIsFetching(true);
    const req = await fetch(BASE_URL + "/commerces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommerce),
    });
    console.log(JSON.stringify(req, null, 4));
    if (req.status === 200) {
      alert("Comercio agregado correctamente");
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
        <Text style={styles.title}>Agregar Comercio</Text>

        <View style={{ width: "100%" }}>
          <FormCommerce
            buttonDisabled={isFetching}
            onSubmit={handleAddCommerce}
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
