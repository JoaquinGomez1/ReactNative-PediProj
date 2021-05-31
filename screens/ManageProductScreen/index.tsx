import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import MyButton from "../../components/Button";
import ProductForm from "../../components/FormAddProduct";
import TouchableIcon from "../../components/TouchableIcon";
import ProductListScreen from "./ProductListScreen";

const actions = (
  navigation?: any,
  setSelectedAction?: React.Dispatch<React.SetStateAction<number | undefined>>
) => [
  {
    id: 0,
    name: "Agregar Producto",
    component: ProductForm,
    onPress: () => setSelectedAction && setSelectedAction(0),
    onSubmit: () => undefined,
  },
  {
    id: 1,
    name: "Editar y Eliminar Productos",
    component: ProductListScreen,
    onPress: () => navigation.push("EditProducts"),
    onSubmit: () => undefined,
  },
];

export default function ManageProductsScreen({ navigation }: any) {
  const [selectedAction, setSelectedAction] = useState<number | undefined>();

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
        <Text style={styles.title}>Gestionar productos</Text>
        <View style={styles.actionsContainer}>
          {actions().map(
            ({ component: Component, id, onSubmit, name }) =>
              selectedAction === id && (
                <View key={id}>
                  <View style={styles.navHeader}>
                    <TouchableIcon
                      onPress={() => setSelectedAction(undefined)}
                      iconName="arrow-left"
                    />
                    <Text>{name}</Text>
                  </View>
                  <Component onSubmit={onSubmit} />
                </View>
              )
          )}
        </View>
        <View style={styles.actionsContainer}>
          {selectedAction === undefined &&
            actions(navigation, setSelectedAction).map(
              ({ name, id, onPress }) => (
                <MyButton title={name} key={id} onPress={onPress} />
              )
            )}
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  actionsContainer: {
    width: "100%",
  },
  navHeader: {
    flexDirection: "row",
  },
});
