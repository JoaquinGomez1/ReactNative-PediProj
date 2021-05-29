import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import MyButton from "../components/Button";
import FormCommerce from "../components/FormCommerce";
import TouchableIcon from "../components/TouchableIcon";

const actions = [
  {
    id: 0,
    name: "Agregar Comercio",
    component: FormCommerce,
    onSubmit: () => undefined,
  },
  {
    id: 1,
    name: "Editar Comercios",
    component: FormCommerce,
    onSubmit: () => undefined,
  },
  {
    id: 2,
    name: "Eliminar Comercio",
    component: FormCommerce,
    onSubmit: () => undefined,
  },
];

export default function ManageCommercesScreen({ navigation }: any) {
  const [selectedAction, setSelectedAction] =
    React.useState<number | undefined>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar comercios</Text>
      <View style={styles.actionsContainer}>
        {actions.map(
          ({ component: FormComponent, id, onSubmit, name }) =>
            selectedAction === id && (
              <View key={id}>
                <TouchableIcon
                  onPress={() => setSelectedAction(undefined)}
                  iconName="arrow-left"
                />
                <Text>{name}</Text>
                <FormComponent onSubmit={onSubmit} />
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
