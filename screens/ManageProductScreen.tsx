import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import MyButton from "../components/Button";
import ProductForm from "../components/FormAddProduct";
import TouchableIcon from "../components/TouchableIcon";

const actions = [
  {
    id: 0,
    name: "Agregar Producto",
    component: ProductForm,
    onSubmit: () => undefined,
  },
  {
    id: 1,
    name: "Editar Producto",
    component: ProductForm,
    onSubmit: () => undefined,
  },
  {
    id: 2,
    name: "Eliminar Producto",
    component: ProductForm,
    onSubmit: () => undefined,
  },
];

export default function ManageProductsScreen() {
  const [selectedAction, setSelectedAction] = useState<number | undefined>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar productos</Text>
      <View style={styles.actionsContainer}>
        {actions.map(
          ({ component: Component, id, onSubmit, name }) =>
            selectedAction === id && (
              <View key={id}>
                <TouchableIcon
                  onPress={() => setSelectedAction(undefined)}
                  iconName="arrow-left"
                />
                <Text>{name}</Text>
                <Component onSubmit={onSubmit} />
              </View>
            )
        )}
      </View>
      <View style={styles.actionsContainer}>
        {selectedAction === undefined &&
          actions.map(({ name, id }) => (
            <MyButton
              title={name}
              key={id}
              onPress={() => setSelectedAction(id)}
            />
          ))}
      </View>
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
});
